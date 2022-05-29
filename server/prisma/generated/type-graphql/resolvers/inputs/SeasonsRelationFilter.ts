import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SeasonsWhereInput } from "../inputs/SeasonsWhereInput";

@TypeGraphQL.InputType("SeasonsRelationFilter", {
  isAbstract: true
})
export class SeasonsRelationFilter {
  @TypeGraphQL.Field(_type => SeasonsWhereInput, {
    nullable: true
  })
  is?: SeasonsWhereInput | undefined;

  @TypeGraphQL.Field(_type => SeasonsWhereInput, {
    nullable: true
  })
  isNot?: SeasonsWhereInput | undefined;
}
