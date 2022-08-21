/* eslint-disable no-param-reassign */
import jwt from "jsonwebtoken";
import { defaultFieldResolver } from "graphql";
import { SchemaDirectiveVisitor } from "apollo-server";
// import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";

// export default (schema, directiveName) => mapSchema(schema, {
//   [MapperKind.FIELD]: async (fieldConfig, _fieldName, _typeName) => {
//     const authDirective = getDirective(schema, fieldConfig, directiveName);
//     if (authDirective && authDirective.length) {
//       const { resolve = defaultFieldResolver } = fieldConfig;
//       fieldConfig.resolve = async (_parent, _args, context, _info) => {
//         const { authorization } = context.headers;
//         if (authorization && authorization.startsWith("Bearer ")) {
//           const [_, token] = authorization.split(" ");
//           const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
//           console.log(decodedToken);
//         }
//       };
//       return fieldConfig;
//     }
//   },
// });

export default class authDirective extends SchemaDirectiveVisitor {

}
