import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {EventsCreateOrConnectWithoutEvent_instancesInput} from '../inputs/EventsCreateOrConnectWithoutEvent_instancesInput';
import {EventsCreateWithoutEvent_instancesInput} from '../inputs/EventsCreateWithoutEvent_instancesInput';
import {EventsUpdateWithoutEvent_instancesInput} from '../inputs/EventsUpdateWithoutEvent_instancesInput';
import {EventsUpsertWithoutEvent_instancesInput} from '../inputs/EventsUpsertWithoutEvent_instancesInput';
import {EventsWhereUniqueInput} from '../inputs/EventsWhereUniqueInput';

@TypeGraphQL.InputType('EventsUpdateOneWithoutEvent_instancesInput', {
  isAbstract: true,
})
export class EventsUpdateOneWithoutEvent_instancesInput {
  @TypeGraphQL.Field((_type) => EventsCreateWithoutEvent_instancesInput, {
    nullable: true,
  })
    create?: EventsCreateWithoutEvent_instancesInput | undefined;

  @TypeGraphQL.Field((_type) => EventsCreateOrConnectWithoutEvent_instancesInput, {
    nullable: true,
  })
    connectOrCreate?: EventsCreateOrConnectWithoutEvent_instancesInput | undefined;

  @TypeGraphQL.Field((_type) => EventsUpsertWithoutEvent_instancesInput, {
    nullable: true,
  })
    upsert?: EventsUpsertWithoutEvent_instancesInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => EventsWhereUniqueInput, {
    nullable: true,
  })
    connect?: EventsWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => EventsUpdateWithoutEvent_instancesInput, {
    nullable: true,
  })
    update?: EventsUpdateWithoutEvent_instancesInput | undefined;
}
