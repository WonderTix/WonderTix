import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DateTimeNullableWithAggregatesFilter} from '../inputs/DateTimeNullableWithAggregatesFilter';
import {IntNullableWithAggregatesFilter} from '../inputs/IntNullableWithAggregatesFilter';
import {IntWithAggregatesFilter} from '../inputs/IntWithAggregatesFilter';
import {StringNullableWithAggregatesFilter} from '../inputs/StringNullableWithAggregatesFilter';

@TypeGraphQL.InputType('Task_notesScalarWhereWithAggregatesInput', {
  isAbstract: true,
})
export class Task_notesScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [Task_notesScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    AND?: Task_notesScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Task_notesScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    OR?: Task_notesScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Task_notesScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    NOT?: Task_notesScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
    id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => IntNullableWithAggregatesFilter, {
    nullable: true,
  })
    task_id?: IntNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
    notes?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
    date_created?: DateTimeNullableWithAggregatesFilter | undefined;
}
