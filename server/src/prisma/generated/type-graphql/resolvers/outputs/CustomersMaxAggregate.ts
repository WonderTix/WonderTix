import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.ObjectType('CustomersMaxAggregate', {
  isAbstract: true,
})
export class CustomersMaxAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    id!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    custname!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    email!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    phone!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    custaddress!: string | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    newsletter!: boolean | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    donorbadge!: string | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    seatingaccom!: boolean | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    vip!: boolean | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    volunteer_list!: boolean | null;
}
