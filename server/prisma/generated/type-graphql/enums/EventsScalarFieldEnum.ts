import * as TypeGraphQL from "type-graphql";

export enum EventsScalarFieldEnum {
  id = "id",
  seasonid = "seasonid",
  eventname = "eventname",
  eventdescription = "eventdescription",
  active = "active",
  image_url = "image_url"
}
TypeGraphQL.registerEnumType(EventsScalarFieldEnum, {
  name: "EventsScalarFieldEnum",
  description: undefined,
});
