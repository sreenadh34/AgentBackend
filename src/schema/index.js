import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mergeTypeDefs } from '@graphql-tools/merge';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const AgentTypeDefs = readFileSync(join(__dirname, 'auth.agent.schema.graphql'), 'utf-8');

export const typeDefs = mergeTypeDefs([AgentTypeDefs]);