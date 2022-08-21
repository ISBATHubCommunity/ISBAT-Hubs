import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const message = "Hello World";

const hello = (parent, args) => {
  pubsub.publish("new_hello", { message });
  return "Hello from example graphql server. :)";
};

export default hello;
