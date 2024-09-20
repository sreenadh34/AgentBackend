import Agent from "../../models/agent.model.js";
import { generateUniqueId } from "../../utils/generateId.js";
import twilio from "twilio";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

export const listAgents = async () => {
  return await Agent.find({});
};

export const getAgent = async (_, { id }) => {
  return await Agent.findById(id);
};

export const createAgent = async (_, { input }) => {
  let uniqueId;
  let agentExists = true;

  // Loop until a unique agentID is found
  while (agentExists) {
    uniqueId = generateUniqueId();
    agentExists = await Agent.exists({ agentID: uniqueId });
  }

  const agent = new Agent({ ...input, agentID: uniqueId });

  await agent.save();

  return {
    message: "Agent created successfully",
    agent: {
      id: uniqueId,
      name: agent.name,
    },
  };
};

export const agentLogin = async (_, { input }) => {
  const agent = await Agent.findOne({ mobileNumber: input.mobileNumber });
  if (!agent) {
    return {
      message: "Agent not found",
    };
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 4 * 60 * 1000); // 4 mints expiry

  agent.otp = otp;
  agent.otpExpiresAt = otpExpiresAt;
  await agent.save();

  await twilioClient.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: input.mobileNumber,
  });

  return {
    message: "OTP sent successfully",
    status: "200",
  };
};

export const agentVerifyOtp = async (_, { input }) => {
  const agent = await Agent.findOne({
    mobileNumber: input.mobileNumber,
  });

  if (!agent) {
    return {
      message: "Agent not found",
      token: "",
      status: "500",
    };
  }

  if (agent.otp !== input.otp) {
    return {
      message: "Invalid OTP",
      token: "",
      status: "500",
    };
  }

  if (agent.otpExpiresAt < new Date()) {
    return {
      message: "OTP expired",
      token: "",
      status: "500",
    };
  }

  const token = jwt.sign({ uerId: agent._id }, process.env.JWT_SECRET, {
    expiresIn: "12d",
  });

  agent.otp = null;
  agent.otpExpiresAt = null;
  await agent.save();

  return {
    message: "OTP verified successfully",
    token,
    status: "200",
  };
};
