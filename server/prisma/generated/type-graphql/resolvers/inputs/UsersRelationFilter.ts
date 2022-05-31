import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UsersWhereInput } from "../inputs/UsersWhereInput";

@TypeGraphQL.InputType("UsersRelationFilter", {
  isAbstract: true
})
export class UsersRelationFilter {
  @TypeGraphQL.Field(_type => UsersWhereInput, {
    nullable: true
  })
  is?: UsersWhereInput | undefined;

  @TypeGraphQL.Field(_type => UsersWhereInput, {
    nullable: true
  })
  isNot?: UsersWhereInput | undefined;
}
