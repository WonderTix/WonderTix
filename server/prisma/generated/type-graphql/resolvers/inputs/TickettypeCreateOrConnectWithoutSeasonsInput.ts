import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TickettypeCreateWithoutSeasonsInput } from "../inputs/TickettypeCreateWithoutSeasonsInput";
import { TickettypeWhereUniqueInput } from "../inputs/TickettypeWhereUniqueInput";

@TypeGraphQL.InputType("TickettypeCreateOrConnectWithoutSeasonsInput", {
  isAbstract: true
})
export class TickettypeCreateOrConnectWithoutSeasonsInput {
  @TypeGraphQL.Field(_type => TickettypeWhereUniqueInput, {
    nullable: false
  })
  where!: TickettypeWhereUniqueInput;

  @TypeGraphQL.Field(_type => TickettypeCreateWithoutSeasonsInput, {
    nullable: false
  })
  create!: TickettypeCreateWithoutSeasonsInput;
}
