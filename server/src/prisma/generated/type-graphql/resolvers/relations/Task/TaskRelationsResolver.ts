import * as TypeGraphQL from 'type-graphql';
import {Customers} from '../../../models/Customers';
import {Donations} from '../../../models/Donations';
import {Reservation} from '../../../models/Reservation';
import {Task} from '../../../models/Task';
import {Task_notes} from '../../../models/Task_notes';
import {Users} from '../../../models/Users';
import {TaskOther_taskArgs} from './args/TaskOther_taskArgs';
import {TaskTask_notesArgs} from './args/TaskTask_notesArgs';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Task)
export class TaskRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => Users, {
    nullable: true,
  })
  async users_task_assign_toTousers(@TypeGraphQL.Root() task: Task, @TypeGraphQL.Ctx() ctx: any): Promise<Users | null> {
    return getPrismaFromContext(ctx).task.findUnique({
      where: {
        id: task.id,
      },
    }).users_task_assign_toTousers({});
  }

  @TypeGraphQL.FieldResolver((_type) => Task, {
    nullable: true,
  })
  async task(@TypeGraphQL.Root() task: Task, @TypeGraphQL.Ctx() ctx: any): Promise<Task | null> {
    return getPrismaFromContext(ctx).task.findUnique({
      where: {
        id: task.id,
      },
    }).task({});
  }

  @TypeGraphQL.FieldResolver((_type) => Customers, {
    nullable: true,
  })
  async customers(@TypeGraphQL.Root() task: Task, @TypeGraphQL.Ctx() ctx: any): Promise<Customers | null> {
    return getPrismaFromContext(ctx).task.findUnique({
      where: {
        id: task.id,
      },
    }).customers({});
  }

  @TypeGraphQL.FieldResolver((_type) => Donations, {
    nullable: true,
  })
  async donations(@TypeGraphQL.Root() task: Task, @TypeGraphQL.Ctx() ctx: any): Promise<Donations | null> {
    return getPrismaFromContext(ctx).task.findUnique({
      where: {
        id: task.id,
      },
    }).donations({});
  }

  @TypeGraphQL.FieldResolver((_type) => Reservation, {
    nullable: true,
  })
  async reservation(@TypeGraphQL.Root() task: Task, @TypeGraphQL.Ctx() ctx: any): Promise<Reservation | null> {
    return getPrismaFromContext(ctx).task.findUnique({
      where: {
        id: task.id,
      },
    }).reservation({});
  }

  @TypeGraphQL.FieldResolver((_type) => Users, {
    nullable: true,
  })
  async users_task_report_toTousers(@TypeGraphQL.Root() task: Task, @TypeGraphQL.Ctx() ctx: any): Promise<Users | null> {
    return getPrismaFromContext(ctx).task.findUnique({
      where: {
        id: task.id,
      },
    }).users_task_report_toTousers({});
  }

  @TypeGraphQL.FieldResolver((_type) => [Task], {
    nullable: false,
  })
  async other_task(@TypeGraphQL.Root() task: Task, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: TaskOther_taskArgs): Promise<Task[]> {
    return getPrismaFromContext(ctx).task.findUnique({
      where: {
        id: task.id,
      },
    }).other_task(args);
  }

  @TypeGraphQL.FieldResolver((_type) => [Task_notes], {
    nullable: false,
  })
  async task_notes(@TypeGraphQL.Root() task: Task, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: TaskTask_notesArgs): Promise<Task_notes[]> {
    return getPrismaFromContext(ctx).task.findUnique({
      where: {
        id: task.id,
      },
    }).task_notes(args);
  }
}
