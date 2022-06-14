import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.InputType('CustomersCreateManyInput', {
  isAbstract: true,
})
export class CustomersCreateManyInput {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    id?: number | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
    custname!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    email?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    phone?: string | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    custaddress?: string | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    newsletter?: boolean | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    donorbadge?: string | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    seatingaccom?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    vip?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    volunteer_list?: boolean | undefined;
}
