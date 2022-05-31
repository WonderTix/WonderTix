import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EventsWhereInput } from "../../../inputs/EventsWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyEventsArgs {
  @TypeGraphQL.Field(_type => EventsWhereInput, {
    nullable: true
  })
  where?: EventsWhereInput | undefined;
}
