import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UsersUpdateManyMutationInput } from "../../../inputs/UsersUpdateManyMutationInput";
import { UsersWhereInput } from "../../../inputs/UsersWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyUsersArgs {
  @TypeGraphQL.Field(_type => UsersUpdateManyMutationInput, {
    nullable: false
  })
  data!: UsersUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => UsersWhereInput, {
    nullable: true
  })
  where?: UsersWhereInput | undefined;
}
