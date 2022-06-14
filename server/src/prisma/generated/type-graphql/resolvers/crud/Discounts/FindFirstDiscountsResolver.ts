import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {FindFirstDiscountsArgs} from './args/FindFirstDiscountsArgs';
import {Discounts} from '../../../models/Discounts';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Discounts)
export class FindFirstDiscountsResolver {
  @TypeGraphQL.Query((_returns) => Discounts, {
    nullable: true,
  })
  async findFirstDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstDiscountsArgs): Promise<Discounts | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).discounts.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
