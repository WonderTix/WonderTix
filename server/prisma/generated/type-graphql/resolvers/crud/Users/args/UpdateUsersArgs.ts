import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UsersUpdateInput } from "../../../inputs/UsersUpdateInput";
import { UsersWhereUniqueInput } from "../../../inputs/UsersWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateUsersArgs {
  @TypeGraphQL.Field(_type => UsersUpdateInput, {
    nullable: false
  })
  data!: UsersUpdateInput;

  @TypeGraphQL.Field(_type => UsersWhereUniqueInput, {
    nullable: false
  })
  where!: UsersWhereUniqueInput;
}
