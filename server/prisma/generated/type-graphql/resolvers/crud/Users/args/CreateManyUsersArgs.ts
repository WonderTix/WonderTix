import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UsersCreateManyInput } from "../../../inputs/UsersCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyUsersArgs {
  @TypeGraphQL.Field(_type => [UsersCreateManyInput], {
    nullable: false
  })
  data!: UsersCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
