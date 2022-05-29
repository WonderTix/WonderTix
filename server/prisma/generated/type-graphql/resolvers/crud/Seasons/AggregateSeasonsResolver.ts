import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateSeasonsArgs } from "./args/AggregateSeasonsArgs";
import { Seasons } from "../../../models/Seasons";
import { AggregateSeasons } from "../../outputs/AggregateSeasons";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Seasons)
export class AggregateSeasonsResolver {
  @TypeGraphQL.Query(_returns => AggregateSeasons, {
    nullable: false
  })
  async aggregateSeasons(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateSeasonsArgs): Promise<AggregateSeasons> {
    return getPrismaFromContext(ctx).seasons.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
