import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {FindUniqueTickettypeArgs} from './args/FindUniqueTickettypeArgs';
import {Tickettype} from '../../../models/Tickettype';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Tickettype)
export class FindUniqueTickettypeResolver {
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
}
