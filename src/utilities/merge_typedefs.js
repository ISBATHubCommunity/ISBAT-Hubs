/* eslint-disable import/no-mutable-exports */
/**
 * This is where the type definition are merge into a single file
 * rather than implementing or writting all the type definition
 * for this api in a single file, this just give us a nice way
 * of separating the type definition in separate file for easy
 * accessiability.
 */

import { join } from "path";
import { readdirSync, readFileSync } from "fs";

const typeDefsFiles = readdirSync(join(__dirname, "../graphQL/typeDefs"));

let typeDefs = "";

typeDefsFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, "../graphQL/typeDefs", file), {
    encoding: "utf8",
  });
});

export default typeDefs;
