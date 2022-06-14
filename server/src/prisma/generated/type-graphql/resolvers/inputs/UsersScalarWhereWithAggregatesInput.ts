import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {BoolNullableWithAggregatesFilter} from '../inputs/BoolNullableWithAggregatesFilter';
import {IntWithAggregatesFilter} from '../inputs/IntWithAggregatesFilter';
import {StringNullableWithAggregatesFilter} from '../inputs/StringNullableWithAggregatesFilter';

@TypeGraphQL.InputType('UsersScalarWhereWithAggregatesInput', {
  isAbstract: true,
})
export class UsersScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field((_type) => [UsersScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    AND?: UsersScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UsersScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    OR?: UsersScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [UsersScalarWhereWithAggregatesInput], {
    nullable: true,
  })
    NOT?: UsersScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field((_type) => IntWithAggregatesFilter, {
    nullable: true,
  })
    id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
    username?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => StringNullableWithAggregatesFilter, {
    nullable: true,
  })
    pass_hash?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field((_type) => BoolNullableWithAggregatesFilter, {
    nullable: true,
  })
    is_superadmin?: BoolNullableWithAggregatesFilter | undefined;
}
