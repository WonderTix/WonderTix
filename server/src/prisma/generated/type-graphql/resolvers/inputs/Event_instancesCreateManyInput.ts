import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.InputType('Event_instancesCreateManyInput', {
  isAbstract: true,
})
export class Event_instancesCreateManyInput {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    id?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    eventid?: number | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    eventdate?: Date | undefined;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    starttime?: Date | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    salestatus?: boolean | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    totalseats?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    availableseats?: number | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    purchaseuri?: string | undefined;
}
