import * as TypeGraphQL from "type-graphql";

export enum state {
  not_started = "not_started",
  in_progress = "in_progress",
  completed = "completed"
}
TypeGraphQL.registerEnumType(state, {
  name: "state",
  description: undefined,
});
