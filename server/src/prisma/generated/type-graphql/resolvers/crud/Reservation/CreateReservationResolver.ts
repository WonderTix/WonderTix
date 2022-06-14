import * as TypeGraphQL from 'type-graphql';
import graphqlFields from 'graphql-fields';
import {GraphQLResolveInfo} from 'graphql';
import {CreateReservationArgs} from './args/CreateReservationArgs';
import {Reservation} from '../../../models/Reservation';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Reservation)
export class CreateReservationResolver {
  @TypeGraphQL.Mutation((_returns) => Reservation, {
    nullable: false,
  })
  async createReservation(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateReservationArgs): Promise<Reservation> {
    const {_count} = transformFields(
        graphqlFields(info as any),
    );
    return getPrismaFromContext(ctx).reservation.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
