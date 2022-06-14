import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DonationsOrderByRelationAggregateInput} from '../inputs/DonationsOrderByRelationAggregateInput';
import {ReservationOrderByRelationAggregateInput} from '../inputs/ReservationOrderByRelationAggregateInput';
import {TaskOrderByRelationAggregateInput} from '../inputs/TaskOrderByRelationAggregateInput';
import {TicketsOrderByRelationAggregateInput} from '../inputs/TicketsOrderByRelationAggregateInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('CustomersOrderByWithRelationInput', {
  isAbstract: true,
})
export class CustomersOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    custname?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    email?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    phone?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    custaddress?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    newsletter?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    donorbadge?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    seatingaccom?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    vip?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    volunteer_list?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => DonationsOrderByRelationAggregateInput, {
    nullable: true,
  })
    donations?: DonationsOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => ReservationOrderByRelationAggregateInput, {
    nullable: true,
  })
    reservation?: ReservationOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TaskOrderByRelationAggregateInput, {
    nullable: true,
  })
    task?: TaskOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TicketsOrderByRelationAggregateInput, {
    nullable: true,
  })
    tickets?: TicketsOrderByRelationAggregateInput | undefined;
}
