import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.InputType('LinkedticketsCreateManyInput', {
  isAbstract: true,
})
export class LinkedticketsCreateManyInput {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    id?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    event_instance_id?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    ticket_type?: number | undefined;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    dummy?: string | undefined;
}
