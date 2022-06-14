import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {NestedEnumstateNullableFilter} from '../inputs/NestedEnumstateNullableFilter';
import {state} from '../../enums/state';

@TypeGraphQL.InputType('EnumstateNullableFilter', {
  isAbstract: true,
})
export class EnumstateNullableFilter {
  @TypeGraphQL.Field((_type) => state, {
    nullable: true,
  })
    equals?: 'not_started' | 'in_progress' | 'completed' | undefined;

  @TypeGraphQL.Field((_type) => [state], {
    nullable: true,
  })
    in?: Array<'not_started' | 'in_progress' | 'completed'> | undefined;

  @TypeGraphQL.Field((_type) => [state], {
    nullable: true,
  })
    notIn?: Array<'not_started' | 'in_progress' | 'completed'> | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumstateNullableFilter, {
    nullable: true,
  })
    not?: NestedEnumstateNullableFilter | undefined;
}
