import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesCreateNestedOneWithoutLinkedticketsInput } from "../inputs/Event_instancesCreateNestedOneWithoutLinkedticketsInput";

@TypeGraphQL.InputType("LinkedticketsCreateWithoutTickettypeInput", {
  isAbstract: true
})
export class LinkedticketsCreateWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  dummy?: string | undefined;

  @TypeGraphQL.Field(_type => Event_instancesCreateNestedOneWithoutLinkedticketsInput, {
    nullable: true
  })
  event_instances?: Event_instancesCreateNestedOneWithoutLinkedticketsInput | undefined;
}
