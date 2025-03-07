"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var schema_exports = {};
__export(schema_exports, {
  User: () => User,
  UserQuery: () => UserQuery
});
module.exports = __toCommonJS(schema_exports);
var import_nexus = require("nexus");
const User = (0, import_nexus.objectType)({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.string("username");
  }
});
const UserQuery = (0, import_nexus.queryType)({
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve: async (_parent, _args, ctx) => {
        return ctx.prisma.user.findMany();
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  User,
  UserQuery
});
//# sourceMappingURL=schema.js.map
