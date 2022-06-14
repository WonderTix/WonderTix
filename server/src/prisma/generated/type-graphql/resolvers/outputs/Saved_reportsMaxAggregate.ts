import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.ObjectType('Saved_reportsMaxAggregate', {
  isAbstract: true,
})
export class Saved_reportsMaxAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    id!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    table_name!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    query_attr!: string | null;
}
