import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {UpsertLinkedticketsArgs} from './args/UpsertLinkedticketsArgs';
import {Linkedtickets} from '../../../models/Linkedtickets';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Linkedtickets)
export class UpsertLinkedticketsResolver {
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
}
