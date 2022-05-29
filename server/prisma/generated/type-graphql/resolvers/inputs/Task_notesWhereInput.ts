import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { IntFilter } from "../inputs/IntFilter";
import { IntNullableFilter } from "../inputs/IntNullableFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { TaskRelationFilter } from "../inputs/TaskRelationFilter";

@TypeGraphQL.InputType("Task_notesWhereInput", {
  isAbstract: true
})
export class Task_notesWhereInput {
  @TypeGraphQL.Field(_type => [Task_notesWhereInput], {
    nullable: true
  })
  AND?: Task_notesWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesWhereInput], {
    nullable: true
  })
  OR?: Task_notesWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesWhereInput], {
    nullable: true
  })
  NOT?: Task_notesWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  id?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => IntNullableFilter, {
    nullable: true
  })
  task_id?: IntNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  notes?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeNullableFilter, {
    nullable: true
  })
  date_created?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field(_type => TaskRelationFilter, {
    nullable: true
  })
  task?: TaskRelationFilter | undefined;
}
