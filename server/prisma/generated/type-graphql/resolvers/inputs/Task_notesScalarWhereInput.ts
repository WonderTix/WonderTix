import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { IntFilter } from "../inputs/IntFilter";
import { IntNullableFilter } from "../inputs/IntNullableFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("Task_notesScalarWhereInput", {
  isAbstract: true
})
export class Task_notesScalarWhereInput {
  @TypeGraphQL.Field(_type => [Task_notesScalarWhereInput], {
    nullable: true
  })
  AND?: Task_notesScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesScalarWhereInput], {
    nullable: true
  })
  OR?: Task_notesScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [Task_notesScalarWhereInput], {
    nullable: true
  })
  NOT?: Task_notesScalarWhereInput[] | undefined;

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
}
