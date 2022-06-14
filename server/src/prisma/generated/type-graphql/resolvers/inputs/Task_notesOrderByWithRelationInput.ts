import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskOrderByWithRelationInput} from '../inputs/TaskOrderByWithRelationInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('Task_notesOrderByWithRelationInput', {
  isAbstract: true,
})
export class Task_notesOrderByWithRelationInput {
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

  @TypeGraphQL.Field((_type) => TaskOrderByWithRelationInput, {
    nullable: true,
  })
    task?: TaskOrderByWithRelationInput | undefined;
}
