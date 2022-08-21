import { PubSub } from "graphql-subscriptions/dist/pubsub";
import { authMutations, authUnion } from "./authentication";
import { messageMutations } from "./messages";
import { helloQueries } from "./hello";
// import { Message } from "../../models";

const pubsub = new PubSub();

const resolvers = {
  Query: {
    ...helloQueries,
    // ...queries
  },
  Mutation: {
    ...authMutations,
    ...messageMutations,
  },
  Subscription: {
    messageCreated: {
      subscribe: (parent, args, context, info) => pubsub.asyncIterator("MESSAGE_CREATED"),
    },
  },
  // Union types here.....
  ...authUnion,
};

export default resolvers;
