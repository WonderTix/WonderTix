import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateManyUsers_task_report_toTousersInput} from '../inputs/TaskCreateManyUsers_task_report_toTousersInput';

@TypeGraphQL.InputType('TaskCreateManyUsers_task_report_toTousersInputEnvelope', {
  isAbstract: true,
})
export class TaskCreateManyUsers_task_report_toTousersInputEnvelope {
  @TypeGraphQL.Field((_type) => [TaskCreateManyUsers_task_report_toTousersInput], {
    nullable: false,
  })
    data!: TaskCreateManyUsers_task_report_toTousersInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
