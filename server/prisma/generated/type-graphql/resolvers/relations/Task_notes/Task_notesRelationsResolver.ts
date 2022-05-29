import * as TypeGraphQL from "type-graphql";
import { Task } from "../../../models/Task";
import { Task_notes } from "../../../models/Task_notes";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Task_notes)
export class Task_notesRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Task, {
    nullable: true
  })
  async task(@TypeGraphQL.Root() task_notes: Task_notes, @TypeGraphQL.Ctx() ctx: any): Promise<Task | null> {
    return getPrismaFromContext(ctx).task_notes.findUnique({
      where: {
        id: task_notes.id,
      },
    }).task({});
  }
}
