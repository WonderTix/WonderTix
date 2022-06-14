import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {UpdateManyEvent_instancesArgs} from './args/UpdateManyEvent_instancesArgs';
import {Event_instances} from '../../../models/Event_instances';
import {AffectedRowsOutput} from '../../outputs/AffectedRowsOutput';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Event_instances)
export class UpdateManyEvent_instancesResolver {
  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async updateManyEvent_instances(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyEvent_instancesArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).event_instances.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
