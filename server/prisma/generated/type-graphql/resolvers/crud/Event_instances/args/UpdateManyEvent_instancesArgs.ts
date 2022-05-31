import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Event_instancesUpdateManyMutationInput } from "../../../inputs/Event_instancesUpdateManyMutationInput";
import { Event_instancesWhereInput } from "../../../inputs/Event_instancesWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyEvent_instancesArgs {
  @TypeGraphQL.Field(_type => Event_instancesUpdateManyMutationInput, {
    nullable: false
  })
  data!: Event_instancesUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => Event_instancesWhereInput, {
    nullable: true
  })
  where?: Event_instancesWhereInput | undefined;
}
