import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Event_instancesCreateManyEventsInputEnvelope} from '../inputs/Event_instancesCreateManyEventsInputEnvelope';
import {Event_instancesCreateOrConnectWithoutEventsInput} from '../inputs/Event_instancesCreateOrConnectWithoutEventsInput';
import {Event_instancesCreateWithoutEventsInput} from '../inputs/Event_instancesCreateWithoutEventsInput';
import {Event_instancesScalarWhereInput} from '../inputs/Event_instancesScalarWhereInput';
import {Event_instancesUpdateManyWithWhereWithoutEventsInput} from '../inputs/Event_instancesUpdateManyWithWhereWithoutEventsInput';
import {Event_instancesUpdateWithWhereUniqueWithoutEventsInput} from '../inputs/Event_instancesUpdateWithWhereUniqueWithoutEventsInput';
import {Event_instancesUpsertWithWhereUniqueWithoutEventsInput} from '../inputs/Event_instancesUpsertWithWhereUniqueWithoutEventsInput';
import {Event_instancesWhereUniqueInput} from '../inputs/Event_instancesWhereUniqueInput';

@TypeGraphQL.InputType('Event_instancesUpdateManyWithoutEventsInput', {
  isAbstract: true,
})
export class Event_instancesUpdateManyWithoutEventsInput {
  @TypeGraphQL.Field((_type) => [Event_instancesCreateWithoutEventsInput], {
    nullable: true,
  })
    create?: Event_instancesCreateWithoutEventsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesCreateOrConnectWithoutEventsInput], {
    nullable: true,
  })
    connectOrCreate?: Event_instancesCreateOrConnectWithoutEventsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesUpsertWithWhereUniqueWithoutEventsInput], {
    nullable: true,
  })
    upsert?: Event_instancesUpsertWithWhereUniqueWithoutEventsInput[] | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesCreateManyEventsInputEnvelope, {
    nullable: true,
  })
    createMany?: Event_instancesCreateManyEventsInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesWhereUniqueInput], {
    nullable: true,
  })
    set?: Event_instancesWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesWhereUniqueInput], {
    nullable: true,
  })
    disconnect?: Event_instancesWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesWhereUniqueInput], {
    nullable: true,
  })
    delete?: Event_instancesWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesWhereUniqueInput], {
    nullable: true,
  })
    connect?: Event_instancesWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesUpdateWithWhereUniqueWithoutEventsInput], {
    nullable: true,
  })
    update?: Event_instancesUpdateWithWhereUniqueWithoutEventsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesUpdateManyWithWhereWithoutEventsInput], {
    nullable: true,
  })
    updateMany?: Event_instancesUpdateManyWithWhereWithoutEventsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesScalarWhereInput], {
    nullable: true,
  })
    deleteMany?: Event_instancesScalarWhereInput[] | undefined;
}
