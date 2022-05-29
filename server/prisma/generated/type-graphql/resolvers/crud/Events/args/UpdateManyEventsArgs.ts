import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { EventsUpdateManyMutationInput } from "../../../inputs/EventsUpdateManyMutationInput";
import { EventsWhereInput } from "../../../inputs/EventsWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyEventsArgs {
  @TypeGraphQL.Field(_type => EventsUpdateManyMutationInput, {
    nullable: false
  })
  data!: EventsUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => EventsWhereInput, {
    nullable: true
  })
  where?: EventsWhereInput | undefined;
}
