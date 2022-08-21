import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const helloSubscription = {
  hello: {
    subscribe(parent, args, context, info) {
      return pubsub.asyncIterator("new_hello");
    }
  }
};

export default helloSubscription;
