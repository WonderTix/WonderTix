import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { LinkedticketsCreateManyTickettypeInputEnvelope } from "../inputs/LinkedticketsCreateManyTickettypeInputEnvelope";
import { LinkedticketsCreateOrConnectWithoutTickettypeInput } from "../inputs/LinkedticketsCreateOrConnectWithoutTickettypeInput";
import { LinkedticketsCreateWithoutTickettypeInput } from "../inputs/LinkedticketsCreateWithoutTickettypeInput";
import { LinkedticketsWhereUniqueInput } from "../inputs/LinkedticketsWhereUniqueInput";

@TypeGraphQL.InputType("LinkedticketsCreateNestedManyWithoutTickettypeInput", {
  isAbstract: true
})
export class LinkedticketsCreateNestedManyWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => [LinkedticketsCreateWithoutTickettypeInput], {
    nullable: true
  })
  create?: LinkedticketsCreateWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsCreateOrConnectWithoutTickettypeInput], {
    nullable: true
  })
  connectOrCreate?: LinkedticketsCreateOrConnectWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => LinkedticketsCreateManyTickettypeInputEnvelope, {
    nullable: true
  })
  createMany?: LinkedticketsCreateManyTickettypeInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [LinkedticketsWhereUniqueInput], {
    nullable: true
  })
  connect?: LinkedticketsWhereUniqueInput[] | undefined;
}
