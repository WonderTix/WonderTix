import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TaskCreateManyTaskInput } from "../inputs/TaskCreateManyTaskInput";

@TypeGraphQL.InputType("TaskCreateManyTaskInputEnvelope", {
  isAbstract: true
})
export class TaskCreateManyTaskInputEnvelope {
  @TypeGraphQL.Field(_type => [TaskCreateManyTaskInput], {
    nullable: false
  })
  data!: TaskCreateManyTaskInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
