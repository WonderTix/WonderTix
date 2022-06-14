import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateWithoutDonationsInput} from '../inputs/TaskCreateWithoutDonationsInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskCreateOrConnectWithoutDonationsInput', {
  isAbstract: true,
})
export class TaskCreateOrConnectWithoutDonationsInput {
  @TypeGraphQL.Field((_type) => TaskWhereUniqueInput, {
    nullable: false,
  })
    where!: TaskWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TaskCreateWithoutDonationsInput, {
    nullable: false,
  })
    create!: TaskCreateWithoutDonationsInput;
}
