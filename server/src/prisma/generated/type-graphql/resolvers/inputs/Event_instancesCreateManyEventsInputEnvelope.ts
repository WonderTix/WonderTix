import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Event_instancesCreateManyEventsInput} from '../inputs/Event_instancesCreateManyEventsInput';

@TypeGraphQL.InputType('Event_instancesCreateManyEventsInputEnvelope', {
  isAbstract: true,
})
export class Event_instancesCreateManyEventsInputEnvelope {
  @TypeGraphQL.Field((_type) => [Event_instancesCreateManyEventsInput], {
    nullable: false,
  })
    data!: Event_instancesCreateManyEventsInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
