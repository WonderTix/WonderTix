import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DateTimeNullableWithAggregatesFilter} from '../inputs/DateTimeNullableWithAggregatesFilter';
import {IntWithAggregatesFilter} from '../inputs/IntWithAggregatesFilter';
import {StringNullableWithAggregatesFilter} from '../inputs/StringNullableWithAggregatesFilter';

@TypeGraphQL.InputType('SeasonsScalarWhereWithAggregatesInput', {
  isAbstract: true,
})
export class SeasonsScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [SeasonsScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    AND?: SeasonsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [SeasonsScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    OR?: SeasonsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [SeasonsScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    NOT?: SeasonsScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
    id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
    name?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
    startdate?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => DateTimeNullableWithAggregatesFilter, {
    nullable: true,
  })
    enddate?: DateTimeNullableWithAggregatesFilter | undefined;
}
