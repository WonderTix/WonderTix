import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesCreateWithoutLinkedticketsInput } from "../inputs/Event_instancesCreateWithoutLinkedticketsInput";
import { Event_instancesUpdateWithoutLinkedticketsInput } from "../inputs/Event_instancesUpdateWithoutLinkedticketsInput";

@TypeGraphQL.InputType("Event_instancesUpsertWithoutLinkedticketsInput", {
  isAbstract: true
})
export class Event_instancesUpsertWithoutLinkedticketsInput {
  @TypeGraphQL.Field(_type => Event_instancesUpdateWithoutLinkedticketsInput, {
    nullable: false
  })
  update!: Event_instancesUpdateWithoutLinkedticketsInput;

  @TypeGraphQL.Field(_type => Event_instancesCreateWithoutLinkedticketsInput, {
    nullable: false
  })
  create!: Event_instancesCreateWithoutLinkedticketsInput;
}
