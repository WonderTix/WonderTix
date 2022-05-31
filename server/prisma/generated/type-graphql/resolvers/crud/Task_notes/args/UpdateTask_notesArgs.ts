import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Task_notesUpdateInput } from "../../../inputs/Task_notesUpdateInput";
import { Task_notesWhereUniqueInput } from "../../../inputs/Task_notesWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateTask_notesArgs {
  @TypeGraphQL.Field(_type => Task_notesUpdateInput, {
    nullable: false
  })
  data!: Task_notesUpdateInput;

  @TypeGraphQL.Field(_type => Task_notesWhereUniqueInput, {
    nullable: false
  })
  where!: Task_notesWhereUniqueInput;
}
