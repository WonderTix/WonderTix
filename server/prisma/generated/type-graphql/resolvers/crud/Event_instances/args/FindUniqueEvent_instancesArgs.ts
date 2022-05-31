import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Event_instancesWhereUniqueInput } from "../../../inputs/Event_instancesWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueEvent_instancesArgs {
  @TypeGraphQL.Field(_type => Event_instancesWhereUniqueInput, {
    nullable: false
  })
  where!: Event_instancesWhereUniqueInput;
}
