import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {FindUniqueLinkedticketsArgs} from './args/FindUniqueLinkedticketsArgs';
import {Linkedtickets} from '../../../models/Linkedtickets';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Linkedtickets)
export class FindUniqueLinkedticketsResolver {
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
}
