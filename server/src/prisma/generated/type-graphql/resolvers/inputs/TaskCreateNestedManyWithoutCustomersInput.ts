import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateManyCustomersInputEnvelope} from '../inputs/TaskCreateManyCustomersInputEnvelope';
import {TaskCreateOrConnectWithoutCustomersInput} from '../inputs/TaskCreateOrConnectWithoutCustomersInput';
import {TaskCreateWithoutCustomersInput} from '../inputs/TaskCreateWithoutCustomersInput';
import {TaskWhereUniqueInput} from '../inputs/TaskWhereUniqueInput';

@TypeGraphQL.InputType('TaskCreateNestedManyWithoutCustomersInput', {
  isAbstract: true,
})
export class TaskCreateNestedManyWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => [TaskCreateWithoutCustomersInput], {
    nullable: true,
  })
    create?: TaskCreateWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TaskCreateOrConnectWithoutCustomersInput], {
    nullable: true,
  })
    connectOrCreate?: TaskCreateOrConnectWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => TaskCreateManyCustomersInputEnvelope, {
    nullable: true,
  })
    createMany?: TaskCreateManyCustomersInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [TaskWhereUniqueInput], {
    nullable: true,
  })
    connect?: TaskWhereUniqueInput[] | undefined;
}
