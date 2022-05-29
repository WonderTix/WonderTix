import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TickettypeCreateOrConnectWithoutTicketsInput } from "../inputs/TickettypeCreateOrConnectWithoutTicketsInput";
import { TickettypeCreateWithoutTicketsInput } from "../inputs/TickettypeCreateWithoutTicketsInput";
import { TickettypeWhereUniqueInput } from "../inputs/TickettypeWhereUniqueInput";

@TypeGraphQL.InputType("TickettypeCreateNestedOneWithoutTicketsInput", {
  isAbstract: true
})
export class TickettypeCreateNestedOneWithoutTicketsInput {
  @TypeGraphQL.Field(_type => TickettypeCreateWithoutTicketsInput, {
    nullable: true
  })
  create?: TickettypeCreateWithoutTicketsInput | undefined;

  @TypeGraphQL.Field(_type => TickettypeCreateOrConnectWithoutTicketsInput, {
    nullable: true
  })
  connectOrCreate?: TickettypeCreateOrConnectWithoutTicketsInput | undefined;

  @TypeGraphQL.Field(_type => TickettypeWhereUniqueInput, {
    nullable: true
  })
  connect?: TickettypeWhereUniqueInput | undefined;
}
