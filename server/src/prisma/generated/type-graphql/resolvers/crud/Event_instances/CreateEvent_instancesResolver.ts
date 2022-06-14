import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {CreateEvent_instancesArgs} from './args/CreateEvent_instancesArgs';
import {Event_instances} from '../../../models/Event_instances';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Event_instances)
export class CreateEvent_instancesResolver {
  @TypeGraphQL.Mutation((_returns) => Event_instances, {
    nullable: false,
  })
  async createEvent_instances(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateEvent_instancesArgs): Promise<Event_instances> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).event_instances.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
