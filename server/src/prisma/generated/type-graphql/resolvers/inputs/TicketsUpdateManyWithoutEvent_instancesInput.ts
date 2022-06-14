import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TicketsCreateManyEvent_instancesInputEnvelope} from '../inputs/TicketsCreateManyEvent_instancesInputEnvelope';
import {TicketsCreateOrConnectWithoutEvent_instancesInput} from '../inputs/TicketsCreateOrConnectWithoutEvent_instancesInput';
import {TicketsCreateWithoutEvent_instancesInput} from '../inputs/TicketsCreateWithoutEvent_instancesInput';
import {TicketsScalarWhereInput} from '../inputs/TicketsScalarWhereInput';
import {TicketsUpdateManyWithWhereWithoutEvent_instancesInput} from '../inputs/TicketsUpdateManyWithWhereWithoutEvent_instancesInput';
import {TicketsUpdateWithWhereUniqueWithoutEvent_instancesInput} from '../inputs/TicketsUpdateWithWhereUniqueWithoutEvent_instancesInput';
import {TicketsUpsertWithWhereUniqueWithoutEvent_instancesInput} from '../inputs/TicketsUpsertWithWhereUniqueWithoutEvent_instancesInput';
import {TicketsWhereUniqueInput} from '../inputs/TicketsWhereUniqueInput';

@TypeGraphQL.InputType('TicketsUpdateManyWithoutEvent_instancesInput', {
  isAbstract: true,
})
export class TicketsUpdateManyWithoutEvent_instancesInput {
  @TypeGraphQL.Field((_type) => [TicketsCreateWithoutEvent_instancesInput], {
    nullable: true,
  })
    create?: TicketsCreateWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsCreateOrConnectWithoutEvent_instancesInput], {
    nullable: true,
  })
    connectOrCreate?: TicketsCreateOrConnectWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsUpsertWithWhereUniqueWithoutEvent_instancesInput], {
    nullable: true,
  })
    upsert?: TicketsUpsertWithWhereUniqueWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field((_type) => TicketsCreateManyEvent_instancesInputEnvelope, {
    nullable: true,
  })
    createMany?: TicketsCreateManyEvent_instancesInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [TicketsWhereUniqueInput], {
    nullable: true,
  })
    set?: TicketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsWhereUniqueInput], {
    nullable: true,
  })
    disconnect?: TicketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsWhereUniqueInput], {
    nullable: true,
  })
    delete?: TicketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsWhereUniqueInput], {
    nullable: true,
  })
    connect?: TicketsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsUpdateWithWhereUniqueWithoutEvent_instancesInput], {
    nullable: true,
  })
    update?: TicketsUpdateWithWhereUniqueWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsUpdateManyWithWhereWithoutEvent_instancesInput], {
    nullable: true,
  })
    updateMany?: TicketsUpdateManyWithWhereWithoutEvent_instancesInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsScalarWhereInput], {
    nullable: true,
  })
    deleteMany?: TicketsScalarWhereInput[] | undefined;
}
