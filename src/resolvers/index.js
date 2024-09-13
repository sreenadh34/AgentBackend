import { mergeResolvers } from "@graphql-tools/merge";
import { agentAuthResolver } from "./auth.agent.resolver.js";

const resolversArray = [agentAuthResolver];
export const resolvers = mergeResolvers(resolversArray);
