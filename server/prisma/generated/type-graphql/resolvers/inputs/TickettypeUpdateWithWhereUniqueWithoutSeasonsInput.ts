import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TickettypeUpdateWithoutSeasonsInput } from "../inputs/TickettypeUpdateWithoutSeasonsInput";
import { TickettypeWhereUniqueInput } from "../inputs/TickettypeWhereUniqueInput";

@TypeGraphQL.InputType("TickettypeUpdateWithWhereUniqueWithoutSeasonsInput", {
  isAbstract: true
})
export class TickettypeUpdateWithWhereUniqueWithoutSeasonsInput {
  @TypeGraphQL.Field(_type => TickettypeWhereUniqueInput, {
    nullable: false
  })
  where!: TickettypeWhereUniqueInput;

  @TypeGraphQL.Field(_type => TickettypeUpdateWithoutSeasonsInput, {
    nullable: false
  })
  data!: TickettypeUpdateWithoutSeasonsInput;
}
