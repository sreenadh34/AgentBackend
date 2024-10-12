import Agent from "../../models/agent.model.js";
import { generateUniqueId } from "../../utils/generateId.js";
import twilio from "twilio";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioClient = twilio(accountSid, authToken);

const secret = process.env.JWT_SECRET || "123456";

export const listAgents = async () => {
  return await Agent.find({});
};

export const getAgent = async (_, { id }) => {
  return await Agent.findById(id);
};

export const createAgent = async (_, { input }) => {
  let uniqueId;
  let agentExists = true;

  // Check if the mobile number already exists
  const existingAgent = await Agent.findOne({
    mobileNumber: input.mobileNumber,
  });
  if (existingAgent) {
    throw new Error(
      "This mobile number is already associated with an existing agent. Please Login."
    );
  }

  // Loop until a unique agentID is found
  while (agentExists) {
    uniqueId = generateUniqueId();
    agentExists = await Agent.exists({ agentID: uniqueId });
  }

  const agent = new Agent({ ...input, agentID: uniqueId });

  await agent.save();

  const token = jwt.sign({ uerId: agent._id }, secret, {
    expiresIn: "12d",
  });

  return {
    message: "Agent created successfully",
    token,
    agent: {
      name: agent.name,
      photo: agent.photo,
      agentID: agent.agentID,
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

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otpExpiresAt = new Date(Date.now() + 4 * 60 * 1000); // 4 mints expiry

  agent.otp = "0000";
  agent.otpExpiresAt = otpExpiresAt;
  await agent.save();

  // await twilioClient.messages.create({
  //   body: `Your OTP for logging into Eduartista is: ${otp}. Please enter this code to continue. This code is valid for 4 minutes.`,
  //   from: "+13142660353",
  //   to: input.mobileNumber,
  // });

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
    throw new Error("Agent not found");
  }

  if (agent.otp !== input.otp) {
    throw new Error("Invalid OTP");
  }

  if (agent.otpExpiresAt < new Date()) {
    throw new Error("OTP expired");
  }

  const token = jwt.sign({ uerId: agent._id }, secret, {
    expiresIn: "12d",
  });

  agent.otp = null;
  agent.otpExpiresAt = null;
  await agent.save();

  return {
    message: "OTP verified successfully",
    token,
    name:agent.name,
    status: "200",
  };
};
