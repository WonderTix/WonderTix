import * as TypeGraphQL from 'type-graphql';
import {Task} from '../../../models/Task';
import {Users} from '../../../models/Users';
import {UsersTask_task_assign_toTousersArgs} from './args/UsersTask_task_assign_toTousersArgs';
import {UsersTask_task_report_toTousersArgs} from './args/UsersTask_task_report_toTousersArgs';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Users)
export class UsersRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => [Task], {
    nullable: false,
  })
  async task_task_assign_toTousers(@TypeGraphQL.Root() users: Users, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UsersTask_task_assign_toTousersArgs): Promise<Task[]> {
    return getPrismaFromContext(ctx).users.findUnique({
      where: {
        id: users.id,
      },
    }).task_task_assign_toTousers(args);
  }

  @TypeGraphQL.FieldResolver((_type) => [Task], {
    nullable: false,
  })
  async task_task_report_toTousers(@TypeGraphQL.Root() users: Users, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UsersTask_task_report_toTousersArgs): Promise<Task[]> {
    return getPrismaFromContext(ctx).users.findUnique({
      where: {
        id: users.id,
      },
    }).task_task_report_toTousers(args);
  }
}
