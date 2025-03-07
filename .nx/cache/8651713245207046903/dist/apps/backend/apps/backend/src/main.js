"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_apollo_server_express = require("apollo-server-express");
var import_schema = require("./schema");
async function main() {
  const app = (0, import_express.default)();
  const server = new import_apollo_server_express.ApolloServer({
    schema: import_schema.schema,
    context: ({ req, res }) => ({ req, res })
    // later integrate Prisma and auth here
  });
  await server.start();
  server.applyMiddleware({ app });
  const port = process.env.PORT || 4e3;
  app.listen(port, () => {
    console.log(
      `\u{1F680} Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
}
main();
