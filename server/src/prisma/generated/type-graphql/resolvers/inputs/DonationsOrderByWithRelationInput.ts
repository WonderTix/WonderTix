import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersOrderByWithRelationInput} from '../inputs/CustomersOrderByWithRelationInput';
import {TaskOrderByRelationAggregateInput} from '../inputs/TaskOrderByRelationAggregateInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('DonationsOrderByWithRelationInput', {
  isAbstract: true,
})
export class DonationsOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    donorid?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    isanonymous?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    amount?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    dononame?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    frequency?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    comments?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    donodate?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => CustomersOrderByWithRelationInput, {
    nullable: true,
  })
    customers?: CustomersOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field((_type) => TaskOrderByRelationAggregateInput, {
    nullable: true,
  })
    task?: TaskOrderByRelationAggregateInput | undefined;
}
