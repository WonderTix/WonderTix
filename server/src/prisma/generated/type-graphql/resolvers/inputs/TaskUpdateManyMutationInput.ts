import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {NullableDateTimeFieldUpdateOperationsInput} from '../inputs/NullableDateTimeFieldUpdateOperationsInput';
import {NullableEnumstateFieldUpdateOperationsInput} from '../inputs/NullableEnumstateFieldUpdateOperationsInput';
import {NullableIntFieldUpdateOperationsInput} from '../inputs/NullableIntFieldUpdateOperationsInput';
import {NullableStringFieldUpdateOperationsInput} from '../inputs/NullableStringFieldUpdateOperationsInput';

@TypeGraphQL.InputType('TaskUpdateManyMutationInput', {
  isAbstract: true,
})
export class TaskUpdateManyMutationInput {
  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
    subject?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
    description?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableEnumstateFieldUpdateOperationsInput, {
    nullable: true,
  })
    status?: NullableEnumstateFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
    date_created?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
    date_assigned?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true,
  })
    due_date?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableIntFieldUpdateOperationsInput, {
    nullable: true,
  })
    rel_account?: NullableIntFieldUpdateOperationsInput | undefined;
}
