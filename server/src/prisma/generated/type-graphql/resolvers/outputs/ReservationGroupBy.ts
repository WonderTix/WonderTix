import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {ReservationAvgAggregate} from '../outputs/ReservationAvgAggregate';
import {ReservationCountAggregate} from '../outputs/ReservationCountAggregate';
import {ReservationMaxAggregate} from '../outputs/ReservationMaxAggregate';
import {ReservationMinAggregate} from '../outputs/ReservationMinAggregate';
import {ReservationSumAggregate} from '../outputs/ReservationSumAggregate';

@TypeGraphQL.ObjectType('ReservationGroupBy', {
  isAbstract: true,
})
export class ReservationGroupBy {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
    transno!: number;

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

  @TypeGraphQL.Field((_type) => ReservationCountAggregate, {
    nullable: true,
  })
    _count!: ReservationCountAggregate | null;

  @TypeGraphQL.Field((_type) => ReservationAvgAggregate, {
    nullable: true,
  })
    _avg!: ReservationAvgAggregate | null;

  @TypeGraphQL.Field((_type) => ReservationSumAggregate, {
    nullable: true,
  })
    _sum!: ReservationSumAggregate | null;

  @TypeGraphQL.Field((_type) => ReservationMinAggregate, {
    nullable: true,
  })
    _min!: ReservationMinAggregate | null;

  @TypeGraphQL.Field((_type) => ReservationMaxAggregate, {
    nullable: true,
  })
    _max!: ReservationMaxAggregate | null;
}
