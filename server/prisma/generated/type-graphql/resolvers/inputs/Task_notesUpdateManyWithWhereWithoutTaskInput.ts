import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Task_notesScalarWhereInput } from "../inputs/Task_notesScalarWhereInput";
import { Task_notesUpdateManyMutationInput } from "../inputs/Task_notesUpdateManyMutationInput";

@TypeGraphQL.InputType("Task_notesUpdateManyWithWhereWithoutTaskInput", {
  isAbstract: true
})
export class Task_notesUpdateManyWithWhereWithoutTaskInput {
  @TypeGraphQL.Field(_type => Task_notesScalarWhereInput, {
    nullable: false
  })
  where!: Task_notesScalarWhereInput;

  @TypeGraphQL.Field(_type => Task_notesUpdateManyMutationInput, {
    nullable: false
  })
  data!: Task_notesUpdateManyMutationInput;
}
