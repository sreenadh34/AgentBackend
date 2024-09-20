import {
  createAgent,
  getAgent,
  listAgents,
  agentLogin,
  agentVerifyOtp,
} from "../services/auth/auth.agent.service.js";

export const agentAuthResolver = {
  Query: { getAgent, listAgents },
  Mutation: { createAgent, agentLogin, agentVerifyOtp },
};
