import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {ReservationCreateManyCustomersInput} from '../inputs/ReservationCreateManyCustomersInput';

@TypeGraphQL.InputType('ReservationCreateManyCustomersInputEnvelope', {
  isAbstract: true,
})
export class ReservationCreateManyCustomersInputEnvelope {
  @TypeGraphQL.Field((_type) => [ReservationCreateManyCustomersInput], {
    nullable: false,
  })
    data!: ReservationCreateManyCustomersInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
