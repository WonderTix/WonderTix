import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateManyCustomersInput} from '../inputs/TaskCreateManyCustomersInput';

@TypeGraphQL.InputType('TaskCreateManyCustomersInputEnvelope', {
  isAbstract: true,
})
export class TaskCreateManyCustomersInputEnvelope {
  @TypeGraphQL.Field((_type) => [TaskCreateManyCustomersInput], {
    nullable: false,
  })
    data!: TaskCreateManyCustomersInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
