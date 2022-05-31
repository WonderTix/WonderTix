import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Event_instancesWhereInput } from "../../../inputs/Event_instancesWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyEvent_instancesArgs {
  @TypeGraphQL.Field(_type => Event_instancesWhereInput, {
    nullable: true
  })
  where?: Event_instancesWhereInput | undefined;
}
