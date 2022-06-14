import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateWithoutUsers_task_report_toTousersInput} from '../inputs/TaskCreateWithoutUsers_task_report_toTousersInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskCreateOrConnectWithoutUsers_task_report_toTousersInput', {
  isAbstract: true,
})
export class TaskCreateOrConnectWithoutUsers_task_report_toTousersInput {
  @TypeGraphQL.Field((_type) => TaskWhereUniqueInput, {
    nullable: false,
  })
    where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TaskCreateWithoutUsers_task_report_toTousersInput, {
    nullable: false,
  })
    create!: TaskCreateWithoutUsers_task_report_toTousersInput;
}
