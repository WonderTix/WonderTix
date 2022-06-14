import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.ObjectType('Event_instancesMaxAggregate', {
  isAbstract: true,
})
export class Event_instancesMaxAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    id!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    eventid!: number | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    eventdate!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    starttime!: Date | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    salestatus!: boolean | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    totalseats!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    availableseats!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    purchaseuri!: string | null;
}
