import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesUpdateOneWithoutLinkedticketsInput } from "../inputs/Event_instancesUpdateOneWithoutLinkedticketsInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("LinkedticketsUpdateWithoutTickettypeInput", {
  isAbstract: true
})
export class LinkedticketsUpdateWithoutTickettypeInput {
  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  dummy?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => Event_instancesUpdateOneWithoutLinkedticketsInput, {
    nullable: true
  })
  event_instances?: Event_instancesUpdateOneWithoutLinkedticketsInput | undefined;
}
