import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {AggregateTicketsArgs} from './args/AggregateTicketsArgs';
import {CreateManyTicketsArgs} from './args/CreateManyTicketsArgs';
import {CreateTicketsArgs} from './args/CreateTicketsArgs';
import {DeleteManyTicketsArgs} from './args/DeleteManyTicketsArgs';
import {DeleteTicketsArgs} from './args/DeleteTicketsArgs';
import {FindFirstTicketsArgs} from './args/FindFirstTicketsArgs';
import {FindManyTicketsArgs} from './args/FindManyTicketsArgs';
import {FindUniqueTicketsArgs} from './args/FindUniqueTicketsArgs';
import {GroupByTicketsArgs} from './args/GroupByTicketsArgs';
import {UpdateManyTicketsArgs} from './args/UpdateManyTicketsArgs';
import {UpdateTicketsArgs} from './args/UpdateTicketsArgs';
import {UpsertTicketsArgs} from './args/UpsertTicketsArgs';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';
import {Tickets} from '../../../models/Tickets';
import {AffectedRowsOutput} from '../../outputs/AffectedRowsOutput';
import {AggregateTickets} from '../../outputs/AggregateTickets';
import {TicketsGroupBy} from '../../outputs/TicketsGroupBy';

@TypeGraphQL.Resolver((_of) => Tickets)
export class TicketsCrudResolver {
  @TypeGraphQL.Query((_returns) => Tickets, {
    nullable: true,
  })
  async findUniqueTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueTicketsArgs): Promise<Tickets | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => Tickets, {
    nullable: true,
  })
  async findFirstTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstTicketsArgs): Promise<Tickets | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.findFirst({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => [Tickets], {
    nullable: false,
  })
  async findManyTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManyTicketsArgs): Promise<Tickets[]> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Tickets, {
    nullable: false,
  })
  async createTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateTicketsArgs): Promise<Tickets> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async createManyTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyTicketsArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.createMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Tickets, {
    nullable: true,
  })
  async deleteTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteTicketsArgs): Promise<Tickets | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Tickets, {
    nullable: true,
  })
  async updateTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateTicketsArgs): Promise<Tickets | null> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async deleteManyTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManyTicketsArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.deleteMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => AffectedRowsOutput, {
    nullable: false,
  })
  async updateManyTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyTicketsArgs): Promise<AffectedRowsOutput> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.updateMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Mutation((_returns) => Tickets, {
    nullable: false,
  })
  async upsertTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertTicketsArgs): Promise<Tickets> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }

  @TypeGraphQL.Query((_returns) => AggregateTickets, {
    nullable: false,
  })
  async aggregateTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateTicketsArgs): Promise<AggregateTickets> {
    return getPrismaFromContext(ctx).tickets.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }

  @TypeGraphQL.Query((_returns) => [TicketsGroupBy], {
    nullable: false,
  })
  async groupByTickets(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByTicketsArgs): Promise<TicketsGroupBy[]> {
    const {_count, _avg, _sum, _min, _max} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).tickets.groupBy({
      ...args,
      ...Object.fromEntries(
          Object.entries({_count, _avg, _sum, _min, _max}).filter(([_, v]) => v != null),
      ),
    });
  }
}
