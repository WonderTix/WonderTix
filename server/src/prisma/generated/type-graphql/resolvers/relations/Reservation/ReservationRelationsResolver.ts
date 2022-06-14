import * as TypeGraphQL from 'type-graphql';
import {Customers} from '../../../models/Customers';
import {Reservation} from '../../../models/Reservation';
import {Task} from '../../../models/Task';
import {ReservationTaskArgs} from './args/ReservationTaskArgs';
import {transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount} from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Reservation)
export class ReservationRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => Customers, {
    nullable: true,
  })
  async customers(@TypeGraphQL.Root() reservation: Reservation, @TypeGraphQL.Ctx() ctx: any): Promise<Customers | null> {
    return getPrismaFromContext(ctx).reservation.findUnique({
      where: {
        transno: reservation.transno,
      },
    }).customers({});
  }

  @TypeGraphQL.FieldResolver((_type) => [Task], {
    nullable: false,
  })
  async task(@TypeGraphQL.Root() reservation: Reservation, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: ReservationTaskArgs): Promise<Task[]> {
    return getPrismaFromContext(ctx).reservation.findUnique({
      where: {
        transno: reservation.transno,
      },
    }).task(args);
  }
}
