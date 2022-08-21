/* eslint-disable import/no-extraneous-dependencies */
import express from "express";
import cors from "cors";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { PubSub } from "graphql-subscriptions";
import mongoose from "mongoose";

import schema from "./src/graphQL/schema";
import "./configs";

const expressPlayground = require("graphql-playground-middleware-express").default;

const pubsub = new PubSub();

(async () => {
  const app = express();

  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Create the http server
  const webServer = createServer(app);

  // Subscription server
  const subscriptionServer = new SubscriptionServer({
    schema, execute, subscribe,
  }, { server: webServer, path: "/graphql" });

  const server = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV !== "production",
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    }],
    context: ({ req, res }) => ({ req, res, pubsub }),
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });

  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

  // connection to database;
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

  // server listener
  webServer.listen(process.env.PORT, () => {
    console.log(`Development server is running at http://${process.env.HOSTNAME}:${process.env.PORT}`);
  });
})();
