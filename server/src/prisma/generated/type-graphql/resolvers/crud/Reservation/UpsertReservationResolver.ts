import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {UpsertReservationArgs} from './args/UpsertReservationArgs';
import {Reservation} from '../../../models/Reservation';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Reservation)
export class UpsertReservationResolver {
  @TypeGraphQL.Mutation((_returns) => Reservation, {
    nullable: false,
  })
  async upsertReservation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertReservationArgs): Promise<Reservation> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).reservation.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
