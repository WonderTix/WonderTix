import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TicketsCreateManyTickettypeInput} from '../inputs/TicketsCreateManyTickettypeInput';

@TypeGraphQL.InputType('TicketsCreateManyTickettypeInputEnvelope', {
  isAbstract: true,
})
export class TicketsCreateManyTickettypeInputEnvelope {
  @TypeGraphQL.Field((_type) => [TicketsCreateManyTickettypeInput], {
    nullable: false,
  })
    data!: TicketsCreateManyTickettypeInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
