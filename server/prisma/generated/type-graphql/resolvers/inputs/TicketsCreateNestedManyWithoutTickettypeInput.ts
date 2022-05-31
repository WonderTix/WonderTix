import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TicketsCreateManyTickettypeInputEnvelope } from "../inputs/TicketsCreateManyTickettypeInputEnvelope";
import { TicketsCreateOrConnectWithoutTickettypeInput } from "../inputs/TicketsCreateOrConnectWithoutTickettypeInput";
import { TicketsCreateWithoutTickettypeInput } from "../inputs/TicketsCreateWithoutTickettypeInput";
import { TicketsWhereUniqueInput } from "../inputs/TicketsWhereUniqueInput";

@TypeGraphQL.InputType("TicketsCreateNestedManyWithoutTickettypeInput", {
  isAbstract: true
})
export class TicketsCreateNestedManyWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => [TicketsCreateWithoutTickettypeInput], {
    nullable: true
  })
  create?: TicketsCreateWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsCreateOrConnectWithoutTickettypeInput], {
    nullable: true
  })
  connectOrCreate?: TicketsCreateOrConnectWithoutTickettypeInput[] | undefined;

  @TypeGraphQL.Field(_type => TicketsCreateManyTickettypeInputEnvelope, {
    nullable: true
  })
  createMany?: TicketsCreateManyTickettypeInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TicketsWhereUniqueInput], {
    nullable: true
  })
  connect?: TicketsWhereUniqueInput[] | undefined;
}
