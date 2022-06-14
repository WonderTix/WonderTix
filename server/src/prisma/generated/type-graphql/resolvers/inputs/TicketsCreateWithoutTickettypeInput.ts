import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateNestedOneWithoutTicketsInput} from '../inputs/CustomersCreateNestedOneWithoutTicketsInput';
import {Event_instancesCreateNestedOneWithoutTicketsInput} from '../inputs/Event_instancesCreateNestedOneWithoutTicketsInput';

@TypeGraphQL.InputType('TicketsCreateWithoutTickettypeInput', {
  isAbstract: true,
})
export class TicketsCreateWithoutTickettypeInput {
  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    paid?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    active?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    checkedin?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    checkedin_ts?: Date | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    payment_intent?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    comments?: string | undefined;

  @TypeGraphQL.Field((_type) => CustomersCreateNestedOneWithoutTicketsInput, {
    nullable: true,
  })
    customers?: CustomersCreateNestedOneWithoutTicketsInput | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesCreateNestedOneWithoutTicketsInput, {
    nullable: true,
  })
    event_instances?: Event_instancesCreateNestedOneWithoutTicketsInput | undefined;
}
