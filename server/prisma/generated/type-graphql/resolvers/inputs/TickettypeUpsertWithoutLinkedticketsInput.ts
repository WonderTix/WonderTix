import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TickettypeCreateWithoutLinkedticketsInput } from "../inputs/TickettypeCreateWithoutLinkedticketsInput";
import { TickettypeUpdateWithoutLinkedticketsInput } from "../inputs/TickettypeUpdateWithoutLinkedticketsInput";

@TypeGraphQL.InputType("TickettypeUpsertWithoutLinkedticketsInput", {
  isAbstract: true
})
export class TickettypeUpsertWithoutLinkedticketsInput {
  @TypeGraphQL.Field(_type => TickettypeUpdateWithoutLinkedticketsInput, {
    nullable: false
  })
  update!: TickettypeUpdateWithoutLinkedticketsInput;

  @TypeGraphQL.Field(_type => TickettypeCreateWithoutLinkedticketsInput, {
    nullable: false
  })
  create!: TickettypeCreateWithoutLinkedticketsInput;
}
