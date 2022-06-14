import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.ObjectType('SeasonsMinAggregate', {
  isAbstract: true,
})
export class SeasonsMinAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    id!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    name!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    startdate!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    enddate!: Date | null;
}
