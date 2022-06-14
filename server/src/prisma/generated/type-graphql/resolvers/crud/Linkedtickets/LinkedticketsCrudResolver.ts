import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {AggregateLinkedticketsArgs} from './args/AggregateLinkedticketsArgs';
import {CreateLinkedticketsArgs} from './args/CreateLinkedticketsArgs';
import {CreateManyLinkedticketsArgs} from './args/CreateManyLinkedticketsArgs';
import {DeleteLinkedticketsArgs} from './args/DeleteLinkedticketsArgs';
import {DeleteManyLinkedticketsArgs} from './args/DeleteManyLinkedticketsArgs';
import {FindFirstLinkedticketsArgs} from './args/FindFirstLinkedticketsArgs';
import {FindManyLinkedticketsArgs} from './args/FindManyLinkedticketsArgs';
import {FindUniqueLinkedticketsArgs} from './args/FindUniqueLinkedticketsArgs';
import {GroupByLinkedticketsArgs} from './args/GroupByLinkedticketsArgs';
import {UpdateLinkedticketsArgs} from './args/UpdateLinkedticketsArgs';
import {UpdateManyLinkedticketsArgs} from './args/UpdateManyLinkedticketsArgs';
import {UpsertLinkedticketsArgs} from './args/UpsertLinkedticketsArgs';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';
import {Linkedtickets} from '../../../models/Linkedtickets';
import {AffectedRowsOutput} from '../../outputs/AffectedRowsOutput';
import {AggregateLinkedtickets} from '../../outputs/AggregateLinkedtickets';
import {LinkedticketsGroupBy} from '../../outputs/LinkedticketsGroupBy';

@TypeGraphQL.Resolver((_of) => Linkedtickets)
export class LinkedticketsCrudResolver {
  @TypeGraphQL.Query((_returns) => Linkedtickets, {
    nullable: true,
  })
  async findUniqueLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueLinkedticketsArgs): Promise<Linkedtickets | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).linkedtickets.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => Linkedtickets, {
    nullable: true,
  })
  async findFirstLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstLinkedticketsArgs): Promise<Linkedtickets | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).linkedtickets.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [Linkedtickets], {
    nullable: false,
  })
  async findManyLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManyLinkedticketsArgs): Promise<Linkedtickets[]> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).linkedtickets.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Linkedtickets, {
    nullable: false,
  })
  async createLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateLinkedticketsArgs): Promise<Linkedtickets> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).linkedtickets.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async createManyLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyLinkedticketsArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).linkedtickets.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Linkedtickets, {
    nullable: true,
  })
  async deleteLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteLinkedticketsArgs): Promise<Linkedtickets | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).linkedtickets.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Linkedtickets, {
    nullable: true,
  })
  async updateLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateLinkedticketsArgs): Promise<Linkedtickets | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).linkedtickets.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManyLinkedticketsArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).linkedtickets.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async updateManyLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyLinkedticketsArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).linkedtickets.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Linkedtickets, {
    nullable: false,
  })
  async upsertLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertLinkedticketsArgs): Promise<Linkedtickets> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).linkedtickets.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => AggregateLinkedtickets, {
    nullable: false,
  })
  async aggregateLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateLinkedticketsArgs): Promise<AggregateLinkedtickets> {
    return getPrismaFromContext(ctx).linkedtickets.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }

  @TypeGraphQL.Query((_returns) => [LinkedticketsGroupBy], {
    nullable: false,
  })
  async groupByLinkedtickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByLinkedticketsArgs): Promise<LinkedticketsGroupBy[]> {
    const {_count, _avg, _sum, _min, _max} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).linkedtickets.groupBy({
      ...args,
      ...Object.fromEntries(
          Object.entries({_count, _avg, _sum, _min, _max}).filter(([_, v]) => v != null),
      ),
    });
  }
}
