import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TicketsWhereInput} from '../inputs/TicketsWhereInput';

@TypeGraphQL.InputType('TicketsListRelationFilter', {
  isAbstract: true,
})
export class TicketsListRelationFilter {
  @TypeGraphQL.Field((_type) => TicketsWhereInput, {
    nullable: true,
  })
    every?: TicketsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => TicketsWhereInput, {
    nullable: true,
  })
    some?: TicketsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => TicketsWhereInput, {
    nullable: true,
  })
    none?: TicketsWhereInput | undefined;
}
