import * as TypeGraphQL from "type-graphql";

export enum TickettypeScalarFieldEnum {
  id = "id",
  name = "name",
  isseason = "isseason",
  seasonid = "seasonid",
  price = "price",
  concessions = "concessions"
}
TypeGraphQL.registerEnumType(TickettypeScalarFieldEnum, {
  name: "TickettypeScalarFieldEnum",
  description: undefined,
});
