import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {UsersCreateWithoutTask_task_report_toTousersInput} from '../inputs/UsersCreateWithoutTask_task_report_toTousersInput';
import {UsersUpdateWithoutTask_task_report_toTousersInput} from '../inputs/UsersUpdateWithoutTask_task_report_toTousersInput';

@TypeGraphQL.InputType('UsersUpsertWithoutTask_task_report_toTousersInput', {
  isAbstract: true,
})
export class UsersUpsertWithoutTask_task_report_toTousersInput {
  @TypeGraphQL.Field((_type) => UsersUpdateWithoutTask_task_report_toTousersInput, {
    nullable: false,
  })
    update!: UsersUpdateWithoutTask_task_report_toTousersInput;

  @TypeGraphQL.Field((_type) => UsersCreateWithoutTask_task_report_toTousersInput, {
    nullable: false,
  })
    create!: UsersCreateWithoutTask_task_report_toTousersInput;
}
