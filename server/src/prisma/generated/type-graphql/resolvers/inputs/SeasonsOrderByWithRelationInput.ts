import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {EventsOrderByRelationAggregateInput} from '../inputs/EventsOrderByRelationAggregateInput';
import {TickettypeOrderByRelationAggregateInput} from '../inputs/TickettypeOrderByRelationAggregateInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('SeasonsOrderByWithRelationInput', {
  isAbstract: true,
})
export class SeasonsOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    name?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    startdate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    enddate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => EventsOrderByRelationAggregateInput, {
    nullable: true,
  })
    events?: EventsOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeOrderByRelationAggregateInput, {
    nullable: true,
  })
    tickettype?: TickettypeOrderByRelationAggregateInput | undefined;
}
