import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EventsUpdateInput } from "../../../inputs/EventsUpdateInput";
import { EventsWhereUniqueInput } from "../../../inputs/EventsWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateEventsArgs {
  @TypeGraphQL.Field(_type => EventsUpdateInput, {
    nullable: false
  })
  data!: EventsUpdateInput;

  @TypeGraphQL.Field(_type => EventsWhereUniqueInput, {
    nullable: false
  })
  where!: EventsWhereUniqueInput;
}
