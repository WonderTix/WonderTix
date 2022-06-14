import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Task_notesAvgOrderByAggregateInput} from '../inputs/Task_notesAvgOrderByAggregateInput';
import {Task_notesCountOrderByAggregateInput} from '../inputs/Task_notesCountOrderByAggregateInput';
import {Task_notesMaxOrderByAggregateInput} from '../inputs/Task_notesMaxOrderByAggregateInput';
import {Task_notesMinOrderByAggregateInput} from '../inputs/Task_notesMinOrderByAggregateInput';
import {Task_notesSumOrderByAggregateInput} from '../inputs/Task_notesSumOrderByAggregateInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('Task_notesOrderByWithAggregationInput', {
  isAbstract: true,
})
export class Task_notesOrderByWithAggregationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    task_id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    notes?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    date_created?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => Task_notesCountOrderByAggregateInput, {
    nullable: true,
  })
    _count?: Task_notesCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => Task_notesAvgOrderByAggregateInput, {
    nullable: true,
  })
    _avg?: Task_notesAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => Task_notesMaxOrderByAggregateInput, {
    nullable: true,
  })
    _max?: Task_notesMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => Task_notesMinOrderByAggregateInput, {
    nullable: true,
  })
    _min?: Task_notesMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => Task_notesSumOrderByAggregateInput, {
    nullable: true,
  })
    _sum?: Task_notesSumOrderByAggregateInput | undefined;
}
