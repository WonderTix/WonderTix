import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TickettypeCreateWithoutLinkedticketsInput } from "../inputs/TickettypeCreateWithoutLinkedticketsInput";
import { TickettypeWhereUniqueInput } from "../inputs/TickettypeWhereUniqueInput";

@TypeGraphQL.InputType("TickettypeCreateOrConnectWithoutLinkedticketsInput", {
  isAbstract: true
})
export class TickettypeCreateOrConnectWithoutLinkedticketsInput {
  @TypeGraphQL.Field(_type => TickettypeWhereUniqueInput, {
    nullable: false
  })
  where!: TickettypeWhereUniqueInput;

  @TypeGraphQL.Field(_type => TickettypeCreateWithoutLinkedticketsInput, {
    nullable: false
  })
  create!: TickettypeCreateWithoutLinkedticketsInput;
}
