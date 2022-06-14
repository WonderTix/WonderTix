import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.InputType('UsersCreateManyInput', {
  isAbstract: true,
})
export class UsersCreateManyInput {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    id?: number | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    username?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    pass_hash?: string | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    is_superadmin?: boolean | undefined;
}
