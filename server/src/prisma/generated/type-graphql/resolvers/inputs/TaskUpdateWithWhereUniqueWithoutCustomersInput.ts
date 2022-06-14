import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskUpdateWithoutCustomersInput} from '../inputs/TaskUpdateWithoutCustomersInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskUpdateWithWhereUniqueWithoutCustomersInput', {
  isAbstract: true,
})
export class TaskUpdateWithWhereUniqueWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => TaskWhereUniqueInput, {
    nullable: false,
  })
    where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TaskUpdateWithoutCustomersInput, {
    nullable: false,
  })
    data!: TaskUpdateWithoutCustomersInput;
}
