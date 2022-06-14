import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {FindManyLinkedticketsArgs} from './args/FindManyLinkedticketsArgs';
import {Linkedtickets} from '../../../models/Linkedtickets';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Linkedtickets)
export class FindManyLinkedticketsResolver {
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
}
