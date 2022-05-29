import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsUpdateWithoutTickettypeInput } from "../inputs/LinkedticketsUpdateWithoutTickettypeInput";
import { LinkedticketsWhereUniqueInput } from "../inputs/LinkedticketsWhereUniqueInput";

@TypeGraphQL.InputType("LinkedticketsUpdateWithWhereUniqueWithoutTickettypeInput", {
  isAbstract: true
})
export class LinkedticketsUpdateWithWhereUniqueWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => LinkedticketsWhereUniqueInput, {
    nullable: false
  })
  where!: LinkedticketsWhereUniqueInput;

  @TypeGraphQL.Field(_type => LinkedticketsUpdateWithoutTickettypeInput, {
    nullable: false
  })
  data!: LinkedticketsUpdateWithoutTickettypeInput;
}
