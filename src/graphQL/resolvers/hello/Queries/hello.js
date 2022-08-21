import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const hello = (parent, args) => {
  pubsub.publish("new_hello", "hello world");
  return "Hello from example graphql server. :)";
};

export default hello;
