import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.ObjectType('UsersMaxAggregate', {
  isAbstract: true,
})
export class UsersMaxAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    id!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    username!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    pass_hash!: string | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    is_superadmin!: boolean | null;
}
