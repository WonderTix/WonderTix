import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {IntFieldUpdateOperationsInput} from '../inputs/IntFieldUpdateOperationsInput';
import {NullableBoolFieldUpdateOperationsInput} from '../inputs/NullableBoolFieldUpdateOperationsInput';
import {NullableDecimalFieldUpdateOperationsInput} from '../inputs/NullableDecimalFieldUpdateOperationsInput';
import {NullableStringFieldUpdateOperationsInput} from '../inputs/NullableStringFieldUpdateOperationsInput';
import {SeasonsUpdateOneWithoutTickettypeInput} from '../inputs/SeasonsUpdateOneWithoutTickettypeInput';
import {TicketsUpdateManyWithoutTickettypeInput} from '../inputs/TicketsUpdateManyWithoutTickettypeInput';

@TypeGraphQL.InputType('TickettypeUpdateWithoutLinkedticketsInput', {
  isAbstract: true,
})
export class TickettypeUpdateWithoutLinkedticketsInput {
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

  @TypeGraphQL.Field((_type) => TicketsUpdateManyWithoutTickettypeInput, {
    nullable: true,
  })
    tickets?: TicketsUpdateManyWithoutTickettypeInput | undefined;
}
