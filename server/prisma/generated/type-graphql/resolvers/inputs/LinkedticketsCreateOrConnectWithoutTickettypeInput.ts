import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsCreateWithoutTickettypeInput } from "../inputs/LinkedticketsCreateWithoutTickettypeInput";
import { LinkedticketsWhereUniqueInput } from "../inputs/LinkedticketsWhereUniqueInput";

@TypeGraphQL.InputType("LinkedticketsCreateOrConnectWithoutTickettypeInput", {
  isAbstract: true
})
export class LinkedticketsCreateOrConnectWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => LinkedticketsWhereUniqueInput, {
    nullable: false
  })
  where!: LinkedticketsWhereUniqueInput;

  @TypeGraphQL.Field(_type => LinkedticketsCreateWithoutTickettypeInput, {
    nullable: false
  })
  create!: LinkedticketsCreateWithoutTickettypeInput;
}
