import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.ObjectType('ReservationMaxAggregate', {
  isAbstract: true,
})
export class ReservationMaxAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    transno!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    custid!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    eventid!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    eventname!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    eventdate!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    showtime!: Date | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    numtickets!: number | null;
}
