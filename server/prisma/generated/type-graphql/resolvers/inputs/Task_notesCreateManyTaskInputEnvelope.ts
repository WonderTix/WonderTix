import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Task_notesCreateManyTaskInput } from "../inputs/Task_notesCreateManyTaskInput";

@TypeGraphQL.InputType("Task_notesCreateManyTaskInputEnvelope", {
  isAbstract: true
})
export class Task_notesCreateManyTaskInputEnvelope {
  @TypeGraphQL.Field(_type => [Task_notesCreateManyTaskInput], {
    nullable: false
  })
  data!: Task_notesCreateManyTaskInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
