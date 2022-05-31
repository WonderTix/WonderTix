import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { LinkedticketsCreateInput } from "../../../inputs/LinkedticketsCreateInput";
import { LinkedticketsUpdateInput } from "../../../inputs/LinkedticketsUpdateInput";
import { LinkedticketsWhereUniqueInput } from "../../../inputs/LinkedticketsWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertLinkedticketsArgs {
  @TypeGraphQL.Field(_type => LinkedticketsWhereUniqueInput, {
    nullable: false
  })
  where!: LinkedticketsWhereUniqueInput;

  @TypeGraphQL.Field(_type => LinkedticketsCreateInput, {
    nullable: false
  })
  create!: LinkedticketsCreateInput;

  @TypeGraphQL.Field(_type => LinkedticketsUpdateInput, {
    nullable: false
  })
  update!: LinkedticketsUpdateInput;
}
