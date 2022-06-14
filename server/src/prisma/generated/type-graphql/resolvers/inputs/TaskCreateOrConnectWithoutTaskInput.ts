import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateWithoutTaskInput} from '../inputs/TaskCreateWithoutTaskInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskCreateOrConnectWithoutTaskInput', {
  isAbstract: true,
})
export class TaskCreateOrConnectWithoutTaskInput {
  @TypeGraphQL.Field((_type) => TaskWhereUniqueInput, {
    nullable: false,
  })
    where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TaskCreateWithoutTaskInput, {
    nullable: false,
  })
    create!: TaskCreateWithoutTaskInput;
}
