import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Saved_reportsCreateInput } from "../../../inputs/Saved_reportsCreateInput";

@TypeGraphQL.ArgsType()
export class CreateSaved_reportsArgs {
  @TypeGraphQL.Field(_type => Saved_reportsCreateInput, {
    nullable: false
  })
  data!: Saved_reportsCreateInput;
}
