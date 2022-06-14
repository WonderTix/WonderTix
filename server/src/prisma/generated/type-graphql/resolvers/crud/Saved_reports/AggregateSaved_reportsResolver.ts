import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {AggregateSaved_reportsArgs} from './args/AggregateSaved_reportsArgs';
import {Saved_reports} from '../../../models/Saved_reports';
import {AggregateSaved_reports} from '../../outputs/AggregateSaved_reports';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Saved_reports)
export class AggregateSaved_reportsResolver {
  @TypeGraphQL.Query((_returns) => AggregateSaved_reports, {
    nullable: false,
  })
  async aggregateSaved_reports(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateSaved_reportsArgs): Promise<AggregateSaved_reports> {
    return getPrismaFromContext(ctx).saved_reports.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
