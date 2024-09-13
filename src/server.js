import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema/index.js';
import resolvers from './resolvers/agent.resolvers.js';
import cors from 'cors';
import connectDB from './database/db.js';
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
