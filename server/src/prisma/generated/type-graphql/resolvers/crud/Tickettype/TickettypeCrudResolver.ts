import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {AggregateTickettypeArgs} from './args/AggregateTickettypeArgs';
import {CreateManyTickettypeArgs} from './args/CreateManyTickettypeArgs';
import {CreateTickettypeArgs} from './args/CreateTickettypeArgs';
import {DeleteManyTickettypeArgs} from './args/DeleteManyTickettypeArgs';
import {DeleteTickettypeArgs} from './args/DeleteTickettypeArgs';
import {FindFirstTickettypeArgs} from './args/FindFirstTickettypeArgs';
import {FindManyTickettypeArgs} from './args/FindManyTickettypeArgs';
import {FindUniqueTickettypeArgs} from './args/FindUniqueTickettypeArgs';
import {GroupByTickettypeArgs} from './args/GroupByTickettypeArgs';
import {UpdateManyTickettypeArgs} from './args/UpdateManyTickettypeArgs';
import {UpdateTickettypeArgs} from './args/UpdateTickettypeArgs';
import {UpsertTickettypeArgs} from './args/UpsertTickettypeArgs';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';
import {Tickettype} from '../../../models/Tickettype';
import {AffectedRowsOutput} from '../../outputs/AffectedRowsOutput';
import {AggregateTickettype} from '../../outputs/AggregateTickettype';
import {TickettypeGroupBy} from '../../outputs/TickettypeGroupBy';

@TypeGraphQL.Resolver((_of) => Tickettype)
export class TickettypeCrudResolver {
  @TypeGraphQL.Query((_returns) => Tickettype, {
    nullable: true,
  })
  async tickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueTickettypeArgs): Promise<Tickettype | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => Tickettype, {
    nullable: true,
  })
  async findFirstTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstTickettypeArgs): Promise<Tickettype | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [Tickettype], {
    nullable: false,
  })
  async tickettypes(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManyTickettypeArgs): Promise<Tickettype[]> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Tickettype, {
    nullable: false,
  })
  async createTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateTickettypeArgs): Promise<Tickettype> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async createManyTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyTickettypeArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Tickettype, {
    nullable: true,
  })
  async deleteTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteTickettypeArgs): Promise<Tickettype | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Tickettype, {
    nullable: true,
  })
  async updateTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateTickettypeArgs): Promise<Tickettype | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManyTickettypeArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async updateManyTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyTickettypeArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Tickettype, {
    nullable: false,
  })
  async upsertTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertTickettypeArgs): Promise<Tickettype> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => AggregateTickettype, {
    nullable: false,
  })
  async aggregateTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateTickettypeArgs): Promise<AggregateTickettype> {
    return getPrismaFromContext(ctx).tickettype.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }

  @TypeGraphQL.Query((_returns) => [TickettypeGroupBy], {
    nullable: false,
  })
  async groupByTickettype(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByTickettypeArgs): Promise<TickettypeGroupBy[]> {
    const {_count, _avg, _sum, _min, _max} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickettype.groupBy({
      ...args,
      ...Object.fromEntries(
          Object.entries({_count, _avg, _sum, _min, _max}).filter(([_, v]) => v != null),
      ),
    });
  }
}
