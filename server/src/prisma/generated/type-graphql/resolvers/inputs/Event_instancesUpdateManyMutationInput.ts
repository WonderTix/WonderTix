import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {NullableBoolFieldUpdateOperationsInput} from '../inputs/NullableBoolFieldUpdateOperationsInput';
import {NullableDateTimeFieldUpdateOperationsInput} from '../inputs/NullableDateTimeFieldUpdateOperationsInput';
import {NullableIntFieldUpdateOperationsInput} from '../inputs/NullableIntFieldUpdateOperationsInput';
import {NullableStringFieldUpdateOperationsInput} from '../inputs/NullableStringFieldUpdateOperationsInput';

@TypeGraphQL.InputType('Event_instancesUpdateManyMutationInput', {
  isAbstract: true,
})
export class Event_instancesUpdateManyMutationInput {
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
}
