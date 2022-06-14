import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TickettypeCreateNestedOneWithoutLinkedticketsInput} from '../inputs/TickettypeCreateNestedOneWithoutLinkedticketsInput';

@TypeGraphQL.InputType('LinkedticketsCreateWithoutEvent_instancesInput', {
  isAbstract: true,
})
export class LinkedticketsCreateWithoutEvent_instancesInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    dummy?: string | undefined;

  @TypeGraphQL.Field((_type) => TickettypeCreateNestedOneWithoutLinkedticketsInput, {
    nullable: true,
  })
    tickettype?: TickettypeCreateNestedOneWithoutLinkedticketsInput | undefined;
}
