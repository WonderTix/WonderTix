import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {AggregateLinkedticketsArgs} from './args/AggregateLinkedticketsArgs';
import {Linkedtickets} from '../../../models/Linkedtickets';
import {AggregateLinkedtickets} from '../../outputs/AggregateLinkedtickets';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Linkedtickets)
export class AggregateLinkedticketsResolver {
  @TypeGraphQL.Query((_returns) => AggregateLinkedtickets, {
    nullable: false,
  })
  async aggregateLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateLinkedticketsArgs): Promise<AggregateLinkedtickets> {
    return getPrismaFromContext(ctx).linkedtickets.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
