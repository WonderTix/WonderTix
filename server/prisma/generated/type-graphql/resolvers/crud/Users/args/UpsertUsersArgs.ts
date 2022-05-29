import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UsersCreateInput } from "../../../inputs/UsersCreateInput";
import { UsersUpdateInput } from "../../../inputs/UsersUpdateInput";
import { UsersWhereUniqueInput } from "../../../inputs/UsersWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertUsersArgs {
  @TypeGraphQL.Field(_type => UsersWhereUniqueInput, {
    nullable: false
  })
  where!: UsersWhereUniqueInput;

  @TypeGraphQL.Field(_type => UsersCreateInput, {
    nullable: false
  })
  create!: UsersCreateInput;

  @TypeGraphQL.Field(_type => UsersUpdateInput, {
    nullable: false
  })
  update!: UsersUpdateInput;
}
