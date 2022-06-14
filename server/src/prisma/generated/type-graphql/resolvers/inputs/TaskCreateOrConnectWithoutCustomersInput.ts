import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateWithoutCustomersInput} from '../inputs/TaskCreateWithoutCustomersInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskCreateOrConnectWithoutCustomersInput', {
  isAbstract: true,
})
export class TaskCreateOrConnectWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => TaskWhereUniqueInput, {
    nullable: false,
  })
    where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TaskCreateWithoutCustomersInput, {
    nullable: false,
  })
    create!: TaskCreateWithoutCustomersInput;
}
