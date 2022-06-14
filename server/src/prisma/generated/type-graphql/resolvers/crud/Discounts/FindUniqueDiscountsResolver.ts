import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {FindUniqueDiscountsArgs} from './args/FindUniqueDiscountsArgs';
import {Discounts} from '../../../models/Discounts';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Discounts)
export class FindUniqueDiscountsResolver {
  @TypeGraphQL.Query((_returns) => Discounts, {
    nullable: true,
  })
  async findUniqueDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueDiscountsArgs): Promise<Discounts | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).discounts.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
