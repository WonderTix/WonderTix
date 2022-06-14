import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {FindFirstEvent_instancesArgs} from './args/FindFirstEvent_instancesArgs';
import {Event_instances} from '../../../models/Event_instances';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Event_instances)
export class FindFirstEvent_instancesResolver {
  @TypeGraphQL.Query((_returns) => Event_instances, {
    nullable: true,
  })
  async findFirstEvent_instances(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstEvent_instancesArgs): Promise<Event_instances | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).event_instances.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
