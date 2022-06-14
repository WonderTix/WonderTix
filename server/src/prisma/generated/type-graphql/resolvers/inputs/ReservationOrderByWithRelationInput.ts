import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersOrderByWithRelationInput} from '../inputs/CustomersOrderByWithRelationInput';
import {TaskOrderByRelationAggregateInput} from '../inputs/TaskOrderByRelationAggregateInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('ReservationOrderByWithRelationInput', {
  isAbstract: true,
})
export class ReservationOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    transno?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    custid?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    eventid?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    eventname?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    eventdate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    showtime?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    numtickets?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => CustomersOrderByWithRelationInput, {
    nullable: true,
  })
    customers?: CustomersOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => TaskOrderByRelationAggregateInput, {
    nullable: true,
  })
    task?: TaskOrderByRelationAggregateInput | undefined;
}
