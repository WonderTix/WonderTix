import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {IntFieldUpdateOperationsInput} from '../inputs/IntFieldUpdateOperationsInput';
import {LinkedticketsUpdateManyWithoutTickettypeInput} from '../inputs/LinkedticketsUpdateManyWithoutTickettypeInput';
import {NullableBoolFieldUpdateOperationsInput} from '../inputs/NullableBoolFieldUpdateOperationsInput';
import {NullableDecimalFieldUpdateOperationsInput} from '../inputs/NullableDecimalFieldUpdateOperationsInput';
import {NullableStringFieldUpdateOperationsInput} from '../inputs/NullableStringFieldUpdateOperationsInput';
import {TicketsUpdateManyWithoutTickettypeInput} from '../inputs/TicketsUpdateManyWithoutTickettypeInput';

@TypeGraphQL.InputType('TickettypeUpdateWithoutSeasonsInput', {
  isAbstract: true,
})
export class TickettypeUpdateWithoutSeasonsInput {
  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
    id?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableStringFieldUpdateOperationsInput, {
    nullable: true,
  })
    name?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableBoolFieldUpdateOperationsInput, {
    nullable: true,
  })
    isseason?: NullableBoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
    price?: NullableDecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => NullableDecimalFieldUpdateOperationsInput, {
    nullable: true,
  })
    concessions?: NullableDecimalFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => LinkedticketsUpdateManyWithoutTickettypeInput, {
    nullable: true,
  })
    linkedtickets?: LinkedticketsUpdateManyWithoutTickettypeInput | undefined;

  @TypeGraphQL.Field((_type) => TicketsUpdateManyWithoutTickettypeInput, {
    nullable: true,
  })
    tickets?: TicketsUpdateManyWithoutTickettypeInput | undefined;
}
