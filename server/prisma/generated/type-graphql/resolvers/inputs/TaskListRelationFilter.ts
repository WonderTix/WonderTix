import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskWhereInput } from "../inputs/TaskWhereInput";

@TypeGraphQL.InputType("TaskListRelationFilter", {
  isAbstract: true
})
export class TaskListRelationFilter {
  @TypeGraphQL.Field(_type => TaskWhereInput, {
    nullable: true
  })
  every?: TaskWhereInput | undefined;

  @TypeGraphQL.Field(_type => TaskWhereInput, {
    nullable: true
  })
  some?: TaskWhereInput | undefined;

  @TypeGraphQL.Field(_type => TaskWhereInput, {
    nullable: true
  })
  none?: TaskWhereInput | undefined;
}
