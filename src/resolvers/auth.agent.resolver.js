import {
  createAgent,
  getAgent,
  listAgents,
} from "../services/auth/auth.agent.service.js";

export const agentAuthResolver = {
  Query: { getAgent, listAgents },
  Mutation: { createAgent },
};

