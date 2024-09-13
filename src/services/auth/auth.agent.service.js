import Agent from "../../models/agent.model.js";
import { generateUniqueId } from "../../utils/generateId.js";

export const listAgents = async () => {
  return await Agent.find({});
};

export const getAgent = async (_, { id }) => {
  return await Agent.findById(id);
};

export const createAgent = async (_, { input }) => {
  const uniqueId = generateUniqueId();
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
