import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersOrderByWithRelationInput} from '../inputs/CustomersOrderByWithRelationInput';
import {Event_instancesOrderByWithRelationInput} from '../inputs/Event_instancesOrderByWithRelationInput';
import {TickettypeOrderByWithRelationInput} from '../inputs/TickettypeOrderByWithRelationInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('TicketsOrderByWithRelationInput', {
  isAbstract: true,
})
export class TicketsOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    ticketno?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    type?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    eventinstanceid?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    custid?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    paid?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    active?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    checkedin?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    checkedin_ts?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    payment_intent?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    comments?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => CustomersOrderByWithRelationInput, {
    nullable: true,
  })
    customers?: CustomersOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesOrderByWithRelationInput, {
    nullable: true,
  })
    event_instances?: Event_instancesOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeOrderByWithRelationInput, {
    nullable: true,
  })
    tickettype?: TickettypeOrderByWithRelationInput | undefined;
}
