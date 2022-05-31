import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateDiscountsArgs } from "./args/AggregateDiscountsArgs";
import { Discounts } from "../../../models/Discounts";
import { AggregateDiscounts } from "../../outputs/AggregateDiscounts";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Discounts)
export class AggregateDiscountsResolver {
  @TypeGraphQL.Query(_returns => AggregateDiscounts, {
    nullable: false
  })
  async aggregateDiscounts(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateDiscountsArgs): Promise<AggregateDiscounts> {
    return getPrismaFromContext(ctx).discounts.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
