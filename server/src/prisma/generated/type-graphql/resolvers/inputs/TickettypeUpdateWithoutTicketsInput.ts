import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {IntFieldUpdateOperationsInput} from '../inputs/IntFieldUpdateOperationsInput';
import {LinkedticketsUpdateManyWithoutTickettypeInput} from '../inputs/LinkedticketsUpdateManyWithoutTickettypeInput';
import {NullableBoolFieldUpdateOperationsInput} from '../inputs/NullableBoolFieldUpdateOperationsInput';
import {NullableDecimalFieldUpdateOperationsInput} from '../inputs/NullableDecimalFieldUpdateOperationsInput';
import {NullableStringFieldUpdateOperationsInput} from '../inputs/NullableStringFieldUpdateOperationsInput';
import {SeasonsUpdateOneWithoutTickettypeInput} from '../inputs/SeasonsUpdateOneWithoutTickettypeInput';

@TypeGraphQL.InputType('TickettypeUpdateWithoutTicketsInput', {
  isAbstract: true,
})
export class TickettypeUpdateWithoutTicketsInput {
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

  @TypeGraphQL.Field((_type) => SeasonsUpdateOneWithoutTickettypeInput, {
    nullable: true,
  })
    seasons?: SeasonsUpdateOneWithoutTickettypeInput | undefined;

  @TypeGraphQL.Field((_type) => LinkedticketsUpdateManyWithoutTickettypeInput, {
    nullable: true,
  })
    linkedtickets?: LinkedticketsUpdateManyWithoutTickettypeInput | undefined;
}
