import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { TickettypeUpdateOneWithoutLinkedticketsInput } from "../inputs/TickettypeUpdateOneWithoutLinkedticketsInput";

@TypeGraphQL.InputType("LinkedticketsUpdateWithoutEvent_instancesInput", {
  isAbstract: true
})
export class LinkedticketsUpdateWithoutEvent_instancesInput {
  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  dummy?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => TickettypeUpdateOneWithoutLinkedticketsInput, {
    nullable: true
  })
  tickettype?: TickettypeUpdateOneWithoutLinkedticketsInput | undefined;
}
