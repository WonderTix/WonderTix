import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Saved_reportsOrderByWithRelationInput } from "../../../inputs/Saved_reportsOrderByWithRelationInput";
import { Saved_reportsWhereInput } from "../../../inputs/Saved_reportsWhereInput";
import { Saved_reportsWhereUniqueInput } from "../../../inputs/Saved_reportsWhereUniqueInput";
import { Saved_reportsScalarFieldEnum } from "../../../../enums/Saved_reportsScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManySaved_reportsArgs {
  @TypeGraphQL.Field(_type => Saved_reportsWhereInput, {
    nullable: true
  })
  where?: Saved_reportsWhereInput | undefined;

  @TypeGraphQL.Field(_type => [Saved_reportsOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: Saved_reportsOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => Saved_reportsWhereUniqueInput, {
    nullable: true
  })
  cursor?: Saved_reportsWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [Saved_reportsScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "table_name" | "query_attr"> | undefined;
}
