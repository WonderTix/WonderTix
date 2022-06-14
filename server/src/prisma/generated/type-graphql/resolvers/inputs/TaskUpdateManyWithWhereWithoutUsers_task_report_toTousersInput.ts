import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskScalarWhereInput} from '../inputs/TaskScalarWhereInput';
import {TaskUpdateManyMutationInput} from '../inputs/TaskUpdateManyMutationInput';

@TypeGraphQL.InputType('TaskUpdateManyWithWhereWithoutUsers_task_report_toTousersInput', {
  isAbstract: true,
})
export class TaskUpdateManyWithWhereWithoutUsers_task_report_toTousersInput {
  @TypeGraphQL.Field((_type) => TaskScalarWhereInput, {
    nullable: false,
  })
    where!: TaskScalarWhereInput;

  @TypeGraphQL.Field((_type) => TaskUpdateManyMutationInput, {
    nullable: false,
  })
    data!: TaskUpdateManyMutationInput;
}
