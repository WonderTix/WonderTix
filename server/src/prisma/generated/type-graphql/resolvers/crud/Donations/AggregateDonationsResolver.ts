import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {AggregateDonationsArgs} from './args/AggregateDonationsArgs';
import {Donations} from '../../../models/Donations';
import {AggregateDonations} from '../../outputs/AggregateDonations';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Donations)
export class AggregateDonationsResolver {
  @TypeGraphQL.Query((_returns) => AggregateDonations, {
    nullable: false,
  })
  async aggregateDonations(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateDonationsArgs): Promise<AggregateDonations> {
    return getPrismaFromContext(ctx).donations.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
