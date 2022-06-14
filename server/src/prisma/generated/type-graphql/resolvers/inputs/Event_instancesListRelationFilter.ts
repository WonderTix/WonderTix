import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Event_instancesWhereInput} from '../inputs/Event_instancesWhereInput';

@TypeGraphQL.InputType('Event_instancesListRelationFilter', {
  isAbstract: true,
})
export class Event_instancesListRelationFilter {
  @TypeGraphQL.Field((_type) => Event_instancesWhereInput, {
    nullable: true,
  })
    every?: Event_instancesWhereInput | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesWhereInput, {
    nullable: true,
  })
    some?: Event_instancesWhereInput | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesWhereInput, {
    nullable: true,
  })
    none?: Event_instancesWhereInput | undefined;
}
