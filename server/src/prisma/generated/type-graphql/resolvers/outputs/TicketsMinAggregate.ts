import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.ObjectType('TicketsMinAggregate', {
  isAbstract: true,
})
export class TicketsMinAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    ticketno!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    type!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    eventinstanceid!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    custid!: number | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    paid!: boolean | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    active!: boolean | null;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    checkedin!: boolean | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    checkedin_ts!: Date | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    payment_intent!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    comments!: string | null;
}
