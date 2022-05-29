import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EventsCreateInput } from "../../../inputs/EventsCreateInput";

@TypeGraphQL.ArgsType()
export class CreateEventsArgs {
  @TypeGraphQL.Field(_type => EventsCreateInput, {
    nullable: false
  })
  data!: EventsCreateInput;
}
