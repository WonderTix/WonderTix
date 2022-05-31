import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { SeasonsCreateInput } from "../../../inputs/SeasonsCreateInput";
import { SeasonsUpdateInput } from "../../../inputs/SeasonsUpdateInput";
import { SeasonsWhereUniqueInput } from "../../../inputs/SeasonsWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertSeasonsArgs {
  @TypeGraphQL.Field(_type => SeasonsWhereUniqueInput, {
    nullable: false
  })
  where!: SeasonsWhereUniqueInput;

  @TypeGraphQL.Field(_type => SeasonsCreateInput, {
    nullable: false
  })
  create!: SeasonsCreateInput;

  @TypeGraphQL.Field(_type => SeasonsUpdateInput, {
    nullable: false
  })
  update!: SeasonsUpdateInput;
}
