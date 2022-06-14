import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {DeleteTickettypeArgs} from './args/DeleteTickettypeArgs';
import {Tickettype} from '../../../models/Tickettype';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Tickettype)
export class DeleteTickettypeResolver {
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
}
