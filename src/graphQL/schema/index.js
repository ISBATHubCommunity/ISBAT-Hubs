/* eslint-disable import/no-mutable-exports */
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "../resolvers";
import { typeDefs } from "../../utilities";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
