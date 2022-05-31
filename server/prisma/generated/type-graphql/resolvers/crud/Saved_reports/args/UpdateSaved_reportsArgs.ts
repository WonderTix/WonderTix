import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Saved_reportsUpdateInput } from "../../../inputs/Saved_reportsUpdateInput";
import { Saved_reportsWhereUniqueInput } from "../../../inputs/Saved_reportsWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateSaved_reportsArgs {
  @TypeGraphQL.Field(_type => Saved_reportsUpdateInput, {
    nullable: false
  })
  data!: Saved_reportsUpdateInput;

  @TypeGraphQL.Field(_type => Saved_reportsWhereUniqueInput, {
    nullable: false
  })
  where!: Saved_reportsWhereUniqueInput;
}
