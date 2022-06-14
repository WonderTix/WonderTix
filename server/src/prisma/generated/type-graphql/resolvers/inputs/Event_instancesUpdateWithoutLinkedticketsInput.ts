import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {EventsUpdateOneWithoutEvent_instancesInput} from '../inputs/EventsUpdateOneWithoutEvent_instancesInput';
import {NullableBoolFieldUpdateOperationsInput} from '../inputs/NullableBoolFieldUpdateOperationsInput';
import {NullableDateTimeFieldUpdateOperationsInput} from '../inputs/NullableDateTimeFieldUpdateOperationsInput';
import {NullableIntFieldUpdateOperationsInput} from '../inputs/NullableIntFieldUpdateOperationsInput';
import {NullableStringFieldUpdateOperationsInput} from '../inputs/NullableStringFieldUpdateOperationsInput';
import {TicketsUpdateManyWithoutEvent_instancesInput} from '../inputs/TicketsUpdateManyWithoutEvent_instancesInput';

@TypeGraphQL.InputType('Event_instancesUpdateWithoutLinkedticketsInput', {
  isAbstract: true,
})
export class Event_instancesUpdateWithoutLinkedticketsInput {
  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
    eventdate?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
    starttime?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableBoolFieldUpdateOperationsInput, {
    nullable: true,
  })
    salestatus?: NullableBoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableIntFieldUpdateOperationsInput, {
    nullable: true,
  })
    totalseats?: NullableIntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableIntFieldUpdateOperationsInput, {
    nullable: true,
  })
    availableseats?: NullableIntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
    purchaseuri?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => EventsUpdateOneWithoutEvent_instancesInput, {
    nullable: true,
  })
    events?: EventsUpdateOneWithoutEvent_instancesInput | undefined;

  @TypeGraphQL.Field((_type) => TicketsUpdateManyWithoutEvent_instancesInput, {
    nullable: true,
  })
    tickets?: TicketsUpdateManyWithoutEvent_instancesInput | undefined;
}
