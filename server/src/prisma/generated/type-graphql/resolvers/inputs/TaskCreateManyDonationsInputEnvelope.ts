import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateManyDonationsInput} from '../inputs/TaskCreateManyDonationsInput';

@TypeGraphQL.InputType('TaskCreateManyDonationsInputEnvelope', {
  isAbstract: true,
})
export class TaskCreateManyDonationsInputEnvelope {
  @TypeGraphQL.Field((_type) => [TaskCreateManyDonationsInput], {
    nullable: false,
  })
    data!: TaskCreateManyDonationsInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
