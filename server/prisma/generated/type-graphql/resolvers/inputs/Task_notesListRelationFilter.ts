import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Task_notesWhereInput } from "../inputs/Task_notesWhereInput";

@TypeGraphQL.InputType("Task_notesListRelationFilter", {
  isAbstract: true
})
export class Task_notesListRelationFilter {
  @TypeGraphQL.Field(_type => Task_notesWhereInput, {
    nullable: true
  })
  every?: Task_notesWhereInput | undefined;

  @TypeGraphQL.Field(_type => Task_notesWhereInput, {
    nullable: true
  })
  some?: Task_notesWhereInput | undefined;

  @TypeGraphQL.Field(_type => Task_notesWhereInput, {
    nullable: true
  })
  none?: Task_notesWhereInput | undefined;
}
