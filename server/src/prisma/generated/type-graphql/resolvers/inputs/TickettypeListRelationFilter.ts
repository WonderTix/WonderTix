import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TickettypeWhereInput} from '../inputs/TickettypeWhereInput';

@TypeGraphQL.InputType('TickettypeListRelationFilter', {
  isAbstract: true,
})
export class TickettypeListRelationFilter {
  @TypeGraphQL.Field((_type) => TickettypeWhereInput, {
    nullable: true,
  })
    every?: TickettypeWhereInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeWhereInput, {
    nullable: true,
  })
    some?: TickettypeWhereInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeWhereInput, {
    nullable: true,
  })
    none?: TickettypeWhereInput | undefined;
}
