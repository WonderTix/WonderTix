import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {UpsertDiscountsArgs} from './args/UpsertDiscountsArgs';
import {Discounts} from '../../../models/Discounts';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Discounts)
export class UpsertDiscountsResolver {
  @TypeGraphQL.Mutation((_returns) => Discounts, {
    nullable: false,
  })
  async upsertDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertDiscountsArgs): Promise<Discounts> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).discounts.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
