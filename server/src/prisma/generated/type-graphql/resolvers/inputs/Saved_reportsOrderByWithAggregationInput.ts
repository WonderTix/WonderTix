import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Saved_reportsAvgOrderByAggregateInput} from '../inputs/Saved_reportsAvgOrderByAggregateInput';
import {Saved_reportsCountOrderByAggregateInput} from '../inputs/Saved_reportsCountOrderByAggregateInput';
import {Saved_reportsMaxOrderByAggregateInput} from '../inputs/Saved_reportsMaxOrderByAggregateInput';
import {Saved_reportsMinOrderByAggregateInput} from '../inputs/Saved_reportsMinOrderByAggregateInput';
import {Saved_reportsSumOrderByAggregateInput} from '../inputs/Saved_reportsSumOrderByAggregateInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('Saved_reportsOrderByWithAggregationInput', {
  isAbstract: true,
})
export class Saved_reportsOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    table_name?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    query_attr?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => Saved_reportsCountOrderByAggregateInput, {
    nullable: true,
  })
    _count?: Saved_reportsCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => Saved_reportsAvgOrderByAggregateInput, {
    nullable: true,
  })
    _avg?: Saved_reportsAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => Saved_reportsMaxOrderByAggregateInput, {
    nullable: true,
  })
    _max?: Saved_reportsMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => Saved_reportsMinOrderByAggregateInput, {
    nullable: true,
  })
    _min?: Saved_reportsMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => Saved_reportsSumOrderByAggregateInput, {
    nullable: true,
  })
    _sum?: Saved_reportsSumOrderByAggregateInput | undefined;
}
