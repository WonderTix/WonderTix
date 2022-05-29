import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesCreateOrConnectWithoutLinkedticketsInput } from "../inputs/Event_instancesCreateOrConnectWithoutLinkedticketsInput";
import { Event_instancesCreateWithoutLinkedticketsInput } from "../inputs/Event_instancesCreateWithoutLinkedticketsInput";
import { Event_instancesWhereUniqueInput } from "../inputs/Event_instancesWhereUniqueInput";

@TypeGraphQL.InputType("Event_instancesCreateNestedOneWithoutLinkedticketsInput", {
  isAbstract: true
})
export class Event_instancesCreateNestedOneWithoutLinkedticketsInput {
  @TypeGraphQL.Field(_type => Event_instancesCreateWithoutLinkedticketsInput, {
    nullable: true
  })
  create?: Event_instancesCreateWithoutLinkedticketsInput | undefined;

  @TypeGraphQL.Field(_type => Event_instancesCreateOrConnectWithoutLinkedticketsInput, {
    nullable: true
  })
  connectOrCreate?: Event_instancesCreateOrConnectWithoutLinkedticketsInput | undefined;

  @TypeGraphQL.Field(_type => Event_instancesWhereUniqueInput, {
    nullable: true
  })
  connect?: Event_instancesWhereUniqueInput | undefined;
}
