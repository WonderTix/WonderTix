import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LinkedticketsCreateInput } from "../../../inputs/LinkedticketsCreateInput";

@TypeGraphQL.ArgsType()
export class CreateLinkedticketsArgs {
  @TypeGraphQL.Field(_type => LinkedticketsCreateInput, {
    nullable: false
  })
  data!: LinkedticketsCreateInput;
}
