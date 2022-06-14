import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TicketsCreateManyCustomersInput} from '../inputs/TicketsCreateManyCustomersInput';

@TypeGraphQL.InputType('TicketsCreateManyCustomersInputEnvelope', {
  isAbstract: true,
})
export class TicketsCreateManyCustomersInputEnvelope {
  @TypeGraphQL.Field((_type) => [TicketsCreateManyCustomersInput], {
    nullable: false,
  })
    data!: TicketsCreateManyCustomersInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
