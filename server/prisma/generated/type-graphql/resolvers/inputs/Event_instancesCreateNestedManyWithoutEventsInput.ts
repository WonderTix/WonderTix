import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesCreateManyEventsInputEnvelope } from "../inputs/Event_instancesCreateManyEventsInputEnvelope";
import { Event_instancesCreateOrConnectWithoutEventsInput } from "../inputs/Event_instancesCreateOrConnectWithoutEventsInput";
import { Event_instancesCreateWithoutEventsInput } from "../inputs/Event_instancesCreateWithoutEventsInput";
import { Event_instancesWhereUniqueInput } from "../inputs/Event_instancesWhereUniqueInput";

@TypeGraphQL.InputType("Event_instancesCreateNestedManyWithoutEventsInput", {
  isAbstract: true
})
export class Event_instancesCreateNestedManyWithoutEventsInput {
  @TypeGraphQL.Field(_type => [Event_instancesCreateWithoutEventsInput], {
    nullable: true
  })
  create?: Event_instancesCreateWithoutEventsInput[] | undefined;

  @TypeGraphQL.Field(_type => [Event_instancesCreateOrConnectWithoutEventsInput], {
    nullable: true
  })
  connectOrCreate?: Event_instancesCreateOrConnectWithoutEventsInput[] | undefined;

  @TypeGraphQL.Field(_type => Event_instancesCreateManyEventsInputEnvelope, {
    nullable: true
  })
  createMany?: Event_instancesCreateManyEventsInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [Event_instancesWhereUniqueInput], {
    nullable: true
  })
  connect?: Event_instancesWhereUniqueInput[] | undefined;
}
