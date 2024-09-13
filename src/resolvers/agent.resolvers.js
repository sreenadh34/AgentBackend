import Agent from '../models/agent.js';
import { generateUniqueId } from '../utils/generateId.js';

const resolvers = {
  Query: {
    listAgents: async () => {
      return await Agent.find({});
    },
    getAgent: async (_, { id }) => {
      return await Agent.findById(id);
    },
  },
  Mutation: {
    createAgent: async (_, { input }) => {
      const uniqueId = generateUniqueId();
      const agent = new Agent({ ...input, agentID: uniqueId });

      await agent.save();

     return {
        message: 'Agent created successfully',
        agent: {
          id: uniqueId,
          name: agent.name,
        },
      };
    },
  },
};

export default resolvers;
