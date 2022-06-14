import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {EventsAvgAggregate} from '../outputs/EventsAvgAggregate';
import {EventsCountAggregate} from '../outputs/EventsCountAggregate';
import {EventsMaxAggregate} from '../outputs/EventsMaxAggregate';
import {EventsMinAggregate} from '../outputs/EventsMinAggregate';
import {EventsSumAggregate} from '../outputs/EventsSumAggregate';

@TypeGraphQL.ObjectType('AggregateEvents', {
  isAbstract: true,
})
export class AggregateEvents {
  @TypeGraphQL.Field((_type) => EventsCountAggregate, {
    nullable: true,
  })
    _count!: EventsCountAggregate | null;

  @TypeGraphQL.Field((_type) => EventsAvgAggregate, {
    nullable: true,
  })
    _avg!: EventsAvgAggregate | null;

  @TypeGraphQL.Field((_type) => EventsSumAggregate, {
    nullable: true,
  })
    _sum!: EventsSumAggregate | null;

  @TypeGraphQL.Field((_type) => EventsMinAggregate, {
    nullable: true,
  })
    _min!: EventsMinAggregate | null;

  @TypeGraphQL.Field((_type) => EventsMaxAggregate, {
    nullable: true,
  })
    _max!: EventsMaxAggregate | null;
}
