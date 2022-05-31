import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateReservationArgs } from "./args/AggregateReservationArgs";
import { Reservation } from "../../../models/Reservation";
import { AggregateReservation } from "../../outputs/AggregateReservation";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Reservation)
export class AggregateReservationResolver {
  @TypeGraphQL.Query(_returns => AggregateReservation, {
    nullable: false
  })
  async aggregateReservation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateReservationArgs): Promise<AggregateReservation> {
    return getPrismaFromContext(ctx).reservation.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
