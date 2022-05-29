import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateCustomersArgs } from "./args/AggregateCustomersArgs";
import { Customers } from "../../../models/Customers";
import { AggregateCustomers } from "../../outputs/AggregateCustomers";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Customers)
export class AggregateCustomersResolver {
  @TypeGraphQL.Query(_returns => AggregateCustomers, {
    nullable: false
  })
  async aggregateCustomers(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateCustomersArgs): Promise<AggregateCustomers> {
    return getPrismaFromContext(ctx).customers.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
