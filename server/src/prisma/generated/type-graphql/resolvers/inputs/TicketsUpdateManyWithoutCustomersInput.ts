import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TicketsCreateManyCustomersInputEnvelope} from '../inputs/TicketsCreateManyCustomersInputEnvelope';
import {TicketsCreateOrConnectWithoutCustomersInput} from '../inputs/TicketsCreateOrConnectWithoutCustomersInput';
import {TicketsCreateWithoutCustomersInput} from '../inputs/TicketsCreateWithoutCustomersInput';
import {TicketsScalarWhereInput} from '../inputs/TicketsScalarWhereInput';
import {TicketsUpdateManyWithWhereWithoutCustomersInput} from '../inputs/TicketsUpdateManyWithWhereWithoutCustomersInput';
import {TicketsUpdateWithWhereUniqueWithoutCustomersInput} from '../inputs/TicketsUpdateWithWhereUniqueWithoutCustomersInput';
import {TicketsUpsertWithWhereUniqueWithoutCustomersInput} from '../inputs/TicketsUpsertWithWhereUniqueWithoutCustomersInput';
import {TicketsWhereUniqueInput} from '../inputs/TicketsWhereUniqueInput';

@TypeGraphQL.InputType('TicketsUpdateManyWithoutCustomersInput', {
  isAbstract: true,
})
export class TicketsUpdateManyWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => [TicketsCreateWithoutCustomersInput], {
    nullable: true,
  })
    create?: TicketsCreateWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsCreateOrConnectWithoutCustomersInput], {
    nullable: true,
  })
    connectOrCreate?: TicketsCreateOrConnectWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsUpsertWithWhereUniqueWithoutCustomersInput], {
    nullable: true,
  })
    upsert?: TicketsUpsertWithWhereUniqueWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => TicketsCreateManyCustomersInputEnvelope, {
    nullable: true,
  })
    createMany?: TicketsCreateManyCustomersInputEnvelope | undefined;

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

  @TypeGraphQL.Field((_type) => [TicketsUpdateWithWhereUniqueWithoutCustomersInput], {
    nullable: true,
  })
    update?: TicketsUpdateWithWhereUniqueWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsUpdateManyWithWhereWithoutCustomersInput], {
    nullable: true,
  })
    updateMany?: TicketsUpdateManyWithWhereWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsScalarWhereInput], {
    nullable: true,
  })
    deleteMany?: TicketsScalarWhereInput[] | undefined;
}
