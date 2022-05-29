import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TicketsCreateManyEvent_instancesInputEnvelope } from "../inputs/TicketsCreateManyEvent_instancesInputEnvelope";
import { TicketsCreateOrConnectWithoutEvent_instancesInput } from "../inputs/TicketsCreateOrConnectWithoutEvent_instancesInput";
import { TicketsCreateWithoutEvent_instancesInput } from "../inputs/TicketsCreateWithoutEvent_instancesInput";
import { TicketsWhereUniqueInput } from "../inputs/TicketsWhereUniqueInput";

@TypeGraphQL.InputType("TicketsCreateNestedManyWithoutEvent_instancesInput", {
  isAbstract: true
})
export class TicketsCreateNestedManyWithoutEvent_instancesInput {
  @TypeGraphQL.Field(_type => [TicketsCreateWithoutEvent_instancesInput], {
    nullable: true
  })
  create?: TicketsCreateWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field(_type => [TicketsCreateOrConnectWithoutEvent_instancesInput], {
    nullable: true
  })
  connectOrCreate?: TicketsCreateOrConnectWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field(_type => TicketsCreateManyEvent_instancesInputEnvelope, {
    nullable: true
  })
  createMany?: TicketsCreateManyEvent_instancesInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TicketsWhereUniqueInput], {
    nullable: true
  })
  connect?: TicketsWhereUniqueInput[] | undefined;
}
