import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Event_instancesUpdateInput } from "../../../inputs/Event_instancesUpdateInput";
import { Event_instancesWhereUniqueInput } from "../../../inputs/Event_instancesWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateEvent_instancesArgs {
  @TypeGraphQL.Field(_type => Event_instancesUpdateInput, {
    nullable: false
  })
  data!: Event_instancesUpdateInput;

  @TypeGraphQL.Field(_type => Event_instancesWhereUniqueInput, {
    nullable: false
  })
  where!: Event_instancesWhereUniqueInput;
}
