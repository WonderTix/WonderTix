import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {LinkedticketsCreateManyTickettypeInput} from '../inputs/LinkedticketsCreateManyTickettypeInput';

@TypeGraphQL.InputType('LinkedticketsCreateManyTickettypeInputEnvelope', {
  isAbstract: true,
})
export class LinkedticketsCreateManyTickettypeInputEnvelope {
  @TypeGraphQL.Field((_type) => [LinkedticketsCreateManyTickettypeInput], {
    nullable: false,
  })
    data!: LinkedticketsCreateManyTickettypeInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
