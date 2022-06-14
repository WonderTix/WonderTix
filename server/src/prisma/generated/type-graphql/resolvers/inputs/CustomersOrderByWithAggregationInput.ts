import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersAvgOrderByAggregateInput} from '../inputs/CustomersAvgOrderByAggregateInput';
import {CustomersCountOrderByAggregateInput} from '../inputs/CustomersCountOrderByAggregateInput';
import {CustomersMaxOrderByAggregateInput} from '../inputs/CustomersMaxOrderByAggregateInput';
import {CustomersMinOrderByAggregateInput} from '../inputs/CustomersMinOrderByAggregateInput';
import {CustomersSumOrderByAggregateInput} from '../inputs/CustomersSumOrderByAggregateInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('CustomersOrderByWithAggregationInput', {
  isAbstract: true,
})
export class CustomersOrderByWithAggregationInput {
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

  @TypeGraphQL.Field((_type) => CustomersCountOrderByAggregateInput, {
    nullable: true,
  })
    _count?: CustomersCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersAvgOrderByAggregateInput, {
    nullable: true,
  })
    _avg?: CustomersAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersMaxOrderByAggregateInput, {
    nullable: true,
  })
    _max?: CustomersMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersMinOrderByAggregateInput, {
    nullable: true,
  })
    _min?: CustomersMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersSumOrderByAggregateInput, {
    nullable: true,
  })
    _sum?: CustomersSumOrderByAggregateInput | undefined;
}
