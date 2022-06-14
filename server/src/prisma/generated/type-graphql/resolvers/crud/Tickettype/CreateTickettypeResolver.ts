import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {CreateTickettypeArgs} from './args/CreateTickettypeArgs';
import {Tickettype} from '../../../models/Tickettype';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Tickettype)
export class CreateTickettypeResolver {
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
}
