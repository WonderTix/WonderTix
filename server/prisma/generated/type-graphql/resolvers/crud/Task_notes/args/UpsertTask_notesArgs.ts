import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Task_notesCreateInput } from "../../../inputs/Task_notesCreateInput";
import { Task_notesUpdateInput } from "../../../inputs/Task_notesUpdateInput";
import { Task_notesWhereUniqueInput } from "../../../inputs/Task_notesWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertTask_notesArgs {
  @TypeGraphQL.Field(_type => Task_notesWhereUniqueInput, {
    nullable: false
  })
  where!: Task_notesWhereUniqueInput;

  @TypeGraphQL.Field(_type => Task_notesCreateInput, {
    nullable: false
  })
  create!: Task_notesCreateInput;

  @TypeGraphQL.Field(_type => Task_notesUpdateInput, {
    nullable: false
  })
  update!: Task_notesUpdateInput;
}
