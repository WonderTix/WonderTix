import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TickettypeAvgOrderByAggregateInput} from '../inputs/TickettypeAvgOrderByAggregateInput';
import {TickettypeCountOrderByAggregateInput} from '../inputs/TickettypeCountOrderByAggregateInput';
import {TickettypeMaxOrderByAggregateInput} from '../inputs/TickettypeMaxOrderByAggregateInput';
import {TickettypeMinOrderByAggregateInput} from '../inputs/TickettypeMinOrderByAggregateInput';
import {TickettypeSumOrderByAggregateInput} from '../inputs/TickettypeSumOrderByAggregateInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('TickettypeOrderByWithAggregationInput', {
  isAbstract: true,
})
export class TickettypeOrderByWithAggregationInput {
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
    isseason?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    seasonid?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    price?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    concessions?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => TickettypeCountOrderByAggregateInput, {
    nullable: true,
  })
    _count?: TickettypeCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeAvgOrderByAggregateInput, {
    nullable: true,
  })
    _avg?: TickettypeAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeMaxOrderByAggregateInput, {
    nullable: true,
  })
    _max?: TickettypeMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeMinOrderByAggregateInput, {
    nullable: true,
  })
    _min?: TickettypeMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeSumOrderByAggregateInput, {
    nullable: true,
  })
    _sum?: TickettypeSumOrderByAggregateInput | undefined;
}
