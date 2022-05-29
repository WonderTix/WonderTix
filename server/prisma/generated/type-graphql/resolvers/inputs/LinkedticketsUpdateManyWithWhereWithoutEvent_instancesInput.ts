import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsScalarWhereInput } from "../inputs/LinkedticketsScalarWhereInput";
import { LinkedticketsUpdateManyMutationInput } from "../inputs/LinkedticketsUpdateManyMutationInput";

@TypeGraphQL.InputType("LinkedticketsUpdateManyWithWhereWithoutEvent_instancesInput", {
  isAbstract: true
})
export class LinkedticketsUpdateManyWithWhereWithoutEvent_instancesInput {
  @TypeGraphQL.Field(_type => LinkedticketsScalarWhereInput, {
    nullable: false
  })
  where!: LinkedticketsScalarWhereInput;

  @TypeGraphQL.Field(_type => LinkedticketsUpdateManyMutationInput, {
    nullable: false
  })
  data!: LinkedticketsUpdateManyMutationInput;
}
