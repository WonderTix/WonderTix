import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TicketsCreateWithoutTickettypeInput } from "../inputs/TicketsCreateWithoutTickettypeInput";
import { TicketsUpdateWithoutTickettypeInput } from "../inputs/TicketsUpdateWithoutTickettypeInput";
import { TicketsWhereUniqueInput } from "../inputs/TicketsWhereUniqueInput";

@TypeGraphQL.InputType("TicketsUpsertWithWhereUniqueWithoutTickettypeInput", {
  isAbstract: true
})
export class TicketsUpsertWithWhereUniqueWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => TicketsWhereUniqueInput, {
    nullable: false
  })
  where!: TicketsWhereUniqueInput;

  @TypeGraphQL.Field(_type => TicketsUpdateWithoutTickettypeInput, {
    nullable: false
  })
  update!: TicketsUpdateWithoutTickettypeInput;

  @TypeGraphQL.Field(_type => TicketsCreateWithoutTickettypeInput, {
    nullable: false
  })
  create!: TicketsCreateWithoutTickettypeInput;
}
