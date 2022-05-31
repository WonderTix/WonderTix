import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsCreateWithoutEvent_instancesInput } from "../inputs/LinkedticketsCreateWithoutEvent_instancesInput";
import { LinkedticketsWhereUniqueInput } from "../inputs/LinkedticketsWhereUniqueInput";

@TypeGraphQL.InputType("LinkedticketsCreateOrConnectWithoutEvent_instancesInput", {
  isAbstract: true
})
export class LinkedticketsCreateOrConnectWithoutEvent_instancesInput {
  @TypeGraphQL.Field(_type => LinkedticketsWhereUniqueInput, {
    nullable: false
  })
  where!: LinkedticketsWhereUniqueInput;

  @TypeGraphQL.Field(_type => LinkedticketsCreateWithoutEvent_instancesInput, {
    nullable: false
  })
  create!: LinkedticketsCreateWithoutEvent_instancesInput;
}
