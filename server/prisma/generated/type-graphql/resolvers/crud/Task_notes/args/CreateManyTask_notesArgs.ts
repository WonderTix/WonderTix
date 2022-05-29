import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Task_notesCreateManyInput } from "../../../inputs/Task_notesCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyTask_notesArgs {
  @TypeGraphQL.Field(_type => [Task_notesCreateManyInput], {
    nullable: false
  })
  data!: Task_notesCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
