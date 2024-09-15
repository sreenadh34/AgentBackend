import Agent from "../../models/agent.model.js";
import { generateUniqueId } from "../../utils/generateId.js";

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
