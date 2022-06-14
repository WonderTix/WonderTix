import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersUpdateOneWithoutTicketsInput} from '../inputs/CustomersUpdateOneWithoutTicketsInput';
import {NullableBoolFieldUpdateOperationsInput} from '../inputs/NullableBoolFieldUpdateOperationsInput';
import {NullableDateTimeFieldUpdateOperationsInput} from '../inputs/NullableDateTimeFieldUpdateOperationsInput';
import {NullableStringFieldUpdateOperationsInput} from '../inputs/NullableStringFieldUpdateOperationsInput';
import {TickettypeUpdateOneWithoutTicketsInput} from '../inputs/TickettypeUpdateOneWithoutTicketsInput';

@TypeGraphQL.InputType('TicketsUpdateWithoutEvent_instancesInput', {
  isAbstract: true,
})
export class TicketsUpdateWithoutEvent_instancesInput {
  @TypeGraphQL.Field((_type) => NullableBoolFieldUpdateOperationsInput, {
    nullable: true,
  })
    paid?: NullableBoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableBoolFieldUpdateOperationsInput, {
    nullable: true,
  })
    active?: NullableBoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableBoolFieldUpdateOperationsInput, {
    nullable: true,
  })
    checkedin?: NullableBoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
    checkedin_ts?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
    payment_intent?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
    comments?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersUpdateOneWithoutTicketsInput, {
    nullable: true,
  })
    customers?: CustomersUpdateOneWithoutTicketsInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeUpdateOneWithoutTicketsInput, {
    nullable: true,
  })
    tickettype?: TickettypeUpdateOneWithoutTicketsInput | undefined;
}
