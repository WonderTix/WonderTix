import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {AggregateDiscountsArgs} from './args/AggregateDiscountsArgs';
import {CreateDiscountsArgs} from './args/CreateDiscountsArgs';
import {CreateManyDiscountsArgs} from './args/CreateManyDiscountsArgs';
import {DeleteDiscountsArgs} from './args/DeleteDiscountsArgs';
import {DeleteManyDiscountsArgs} from './args/DeleteManyDiscountsArgs';
import {FindFirstDiscountsArgs} from './args/FindFirstDiscountsArgs';
import {FindManyDiscountsArgs} from './args/FindManyDiscountsArgs';
import {FindUniqueDiscountsArgs} from './args/FindUniqueDiscountsArgs';
import {GroupByDiscountsArgs} from './args/GroupByDiscountsArgs';
import {UpdateDiscountsArgs} from './args/UpdateDiscountsArgs';
import {UpdateManyDiscountsArgs} from './args/UpdateManyDiscountsArgs';
import {UpsertDiscountsArgs} from './args/UpsertDiscountsArgs';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';
import {Discounts} from '../../../models/Discounts';
import {AffectedRowsOutput} from '../../outputs/AffectedRowsOutput';
import {AggregateDiscounts} from '../../outputs/AggregateDiscounts';
import {DiscountsGroupBy} from '../../outputs/DiscountsGroupBy';

@TypeGraphQL.Resolver((_of) => Discounts)
export class DiscountsCrudResolver {
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

  @TypeGraphQL.Query((_returns) => [Discounts], {
    nullable: false,
  })
  async findManyDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManyDiscountsArgs): Promise<Discounts[]> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).discounts.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Discounts, {
    nullable: false,
  })
  async createDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateDiscountsArgs): Promise<Discounts> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).discounts.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async createManyDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyDiscountsArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).discounts.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Discounts, {
    nullable: true,
  })
  async deleteDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteDiscountsArgs): Promise<Discounts | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).discounts.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Discounts, {
    nullable: true,
  })
  async updateDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateDiscountsArgs): Promise<Discounts | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).discounts.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManyDiscountsArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).discounts.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async updateManyDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyDiscountsArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).discounts.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

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

  @TypeGraphQL.Query((_returns) => AggregateDiscounts, {
    nullable: false,
  })
  async aggregateDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateDiscountsArgs): Promise<AggregateDiscounts> {
    return getPrismaFromContext(ctx).discounts.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }

  @TypeGraphQL.Query((_returns) => [DiscountsGroupBy], {
    nullable: false,
  })
  async groupByDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByDiscountsArgs): Promise<DiscountsGroupBy[]> {
    const {_count, _avg, _sum, _min, _max} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).discounts.groupBy({
      ...args,
      ...Object.fromEntries(
          Object.entries({_count, _avg, _sum, _min, _max}).filter(([_, v]) => v != null),
      ),
    });
  }
}
