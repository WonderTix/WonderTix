import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TicketsCreateManyEvent_instancesInput} from '../inputs/TicketsCreateManyEvent_instancesInput';

@TypeGraphQL.InputType('TicketsCreateManyEvent_instancesInputEnvelope', {
  isAbstract: true,
})
export class TicketsCreateManyEvent_instancesInputEnvelope {
  @TypeGraphQL.Field((_type) => [TicketsCreateManyEvent_instancesInput], {
    nullable: false,
  })
    data!: TicketsCreateManyEvent_instancesInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
