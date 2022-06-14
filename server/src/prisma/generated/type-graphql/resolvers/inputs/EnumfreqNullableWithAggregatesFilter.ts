import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {NestedEnumfreqNullableFilter} from '../inputs/NestedEnumfreqNullableFilter';
import {NestedEnumfreqNullableWithAggregatesFilter} from '../inputs/NestedEnumfreqNullableWithAggregatesFilter';
import {NestedIntNullableFilter} from '../inputs/NestedIntNullableFilter';
import {freq} from '../../enums/freq';

@TypeGraphQL.InputType('EnumfreqNullableWithAggregatesFilter', {
  isAbstract: true,
})
export class EnumfreqNullableWithAggregatesFilter {
  @TypeGraphQL.Field((_type) => freq, {
    nullable: true,
  })
    equals?: 'one_time' | 'weekly' | 'monthly' | 'yearly' | undefined;

  @TypeGraphQL.Field((_type) => [freq], {
    nullable: true,
  })
    in?: Array<'one_time' | 'weekly' | 'monthly' | 'yearly'> | undefined;

  @TypeGraphQL.Field((_type) => [freq], {
    nullable: true,
  })
    notIn?: Array<'one_time' | 'weekly' | 'monthly' | 'yearly'> | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumfreqNullableWithAggregatesFilter, {
    nullable: true,
  })
    not?: NestedEnumfreqNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedIntNullableFilter, {
    nullable: true,
  })
    _count?: NestedIntNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumfreqNullableFilter, {
    nullable: true,
  })
    _min?: NestedEnumfreqNullableFilter | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumfreqNullableFilter, {
    nullable: true,
  })
    _max?: NestedEnumfreqNullableFilter | undefined;
}
