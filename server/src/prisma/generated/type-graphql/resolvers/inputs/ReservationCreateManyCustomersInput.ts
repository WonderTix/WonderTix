import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.InputType('ReservationCreateManyCustomersInput', {
  isAbstract: true,
})
export class ReservationCreateManyCustomersInput {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    transno?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    eventid?: number | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    eventname?: string | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    eventdate?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    showtime?: Date | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    numtickets?: number | undefined;
}
