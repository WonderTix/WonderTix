import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsCreateWithoutTickettypeInput } from "../inputs/LinkedticketsCreateWithoutTickettypeInput";
import { LinkedticketsUpdateWithoutTickettypeInput } from "../inputs/LinkedticketsUpdateWithoutTickettypeInput";
import { LinkedticketsWhereUniqueInput } from "../inputs/LinkedticketsWhereUniqueInput";

@TypeGraphQL.InputType("LinkedticketsUpsertWithWhereUniqueWithoutTickettypeInput", {
  isAbstract: true
})
export class LinkedticketsUpsertWithWhereUniqueWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => LinkedticketsWhereUniqueInput, {
    nullable: false
  })
  where!: LinkedticketsWhereUniqueInput;

  @TypeGraphQL.Field(_type => LinkedticketsUpdateWithoutTickettypeInput, {
    nullable: false
  })
  update!: LinkedticketsUpdateWithoutTickettypeInput;

  @TypeGraphQL.Field(_type => LinkedticketsCreateWithoutTickettypeInput, {
    nullable: false
  })
  create!: LinkedticketsCreateWithoutTickettypeInput;
}
