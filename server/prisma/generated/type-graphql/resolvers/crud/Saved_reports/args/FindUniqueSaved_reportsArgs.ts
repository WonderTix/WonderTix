import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Saved_reportsWhereUniqueInput } from "../../../inputs/Saved_reportsWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueSaved_reportsArgs {
  @TypeGraphQL.Field(_type => Saved_reportsWhereUniqueInput, {
    nullable: false
  })
  where!: Saved_reportsWhereUniqueInput;
}
