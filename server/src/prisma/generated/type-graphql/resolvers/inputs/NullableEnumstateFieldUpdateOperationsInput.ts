import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {state} from '../../enums/state';

@TypeGraphQL.InputType('NullableEnumstateFieldUpdateOperationsInput', {
  isAbstract: true,
})
export class NullableEnumstateFieldUpdateOperationsInput {
  @TypeGraphQL.Field((_type) => state, {
    nullable: true,
  })
    set?: 'not_started' | 'in_progress' | 'completed' | undefined;
}
