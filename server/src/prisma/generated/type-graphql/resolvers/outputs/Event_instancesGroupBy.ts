import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Event_instancesAvgAggregate} from '../outputs/Event_instancesAvgAggregate';
import {Event_instancesCountAggregate} from '../outputs/Event_instancesCountAggregate';
import {Event_instancesMaxAggregate} from '../outputs/Event_instancesMaxAggregate';
import {Event_instancesMinAggregate} from '../outputs/Event_instancesMinAggregate';
import {Event_instancesSumAggregate} from '../outputs/Event_instancesSumAggregate';

@TypeGraphQL.ObjectType('Event_instancesGroupBy', {
  isAbstract: true,
})
export class Event_instancesGroupBy {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
    id!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    eventid!: number | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    eventdate!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    starttime!: Date | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    salestatus!: boolean | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    totalseats!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    availableseats!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    purchaseuri!: string | null;

  @TypeGraphQL.Field((_type) => Event_instancesCountAggregate, {
    nullable: true,
  })
    _count!: Event_instancesCountAggregate | null;

  @TypeGraphQL.Field((_type) => Event_instancesAvgAggregate, {
    nullable: true,
  })
    _avg!: Event_instancesAvgAggregate | null;

  @TypeGraphQL.Field((_type) => Event_instancesSumAggregate, {
    nullable: true,
  })
    _sum!: Event_instancesSumAggregate | null;

  @TypeGraphQL.Field((_type) => Event_instancesMinAggregate, {
    nullable: true,
  })
    _min!: Event_instancesMinAggregate | null;

  @TypeGraphQL.Field((_type) => Event_instancesMaxAggregate, {
    nullable: true,
  })
    _max!: Event_instancesMaxAggregate | null;
}
