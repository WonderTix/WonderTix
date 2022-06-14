import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TickettypeWhereInput} from '../inputs/TickettypeWhereInput';

@TypeGraphQL.InputType('TickettypeRelationFilter', {
  isAbstract: true,
})
export class TickettypeRelationFilter {
  @TypeGraphQL.Field((_type) => TickettypeWhereInput, {
    nullable: true,
  })
    is?: TickettypeWhereInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeWhereInput, {
    nullable: true,
  })
    isNot?: TickettypeWhereInput | undefined;
}
