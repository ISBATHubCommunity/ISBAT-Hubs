const hello = {
  subscribe: (parent, args, { pubsub }) => {
    console.log(pubsub);
    // pubsub.asyncIterator("new_hello")
  },
};

export default hello;
