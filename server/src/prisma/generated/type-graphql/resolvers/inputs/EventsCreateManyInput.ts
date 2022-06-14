import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.InputType('EventsCreateManyInput', {
  isAbstract: true,
})
export class EventsCreateManyInput {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    id?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    seasonid?: number | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
    eventname!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    eventdescription?: string | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    active?: boolean | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    image_url?: string | undefined;
}
