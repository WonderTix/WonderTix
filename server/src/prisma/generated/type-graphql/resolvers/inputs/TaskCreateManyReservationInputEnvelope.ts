import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskCreateManyReservationInput} from '../inputs/TaskCreateManyReservationInput';

@TypeGraphQL.InputType('TaskCreateManyReservationInputEnvelope', {
  isAbstract: true,
})
export class TaskCreateManyReservationInputEnvelope {
  @TypeGraphQL.Field((_type) => [TaskCreateManyReservationInput], {
    nullable: false,
  })
    data!: TaskCreateManyReservationInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
