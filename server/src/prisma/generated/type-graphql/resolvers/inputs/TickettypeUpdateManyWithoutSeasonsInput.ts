import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TickettypeCreateManySeasonsInputEnvelope} from '../inputs/TickettypeCreateManySeasonsInputEnvelope';
import {TickettypeCreateOrConnectWithoutSeasonsInput} from '../inputs/TickettypeCreateOrConnectWithoutSeasonsInput';
import {TickettypeCreateWithoutSeasonsInput} from '../inputs/TickettypeCreateWithoutSeasonsInput';
import {TickettypeScalarWhereInput} from '../inputs/TickettypeScalarWhereInput';
import {TickettypeUpdateManyWithWhereWithoutSeasonsInput} from '../inputs/TickettypeUpdateManyWithWhereWithoutSeasonsInput';
import {TickettypeUpdateWithWhereUniqueWithoutSeasonsInput} from '../inputs/TickettypeUpdateWithWhereUniqueWithoutSeasonsInput';
import {TickettypeUpsertWithWhereUniqueWithoutSeasonsInput} from '../inputs/TickettypeUpsertWithWhereUniqueWithoutSeasonsInput';
import {TickettypeWhereUniqueInput} from '../inputs/TickettypeWhereUniqueInput';

@TypeGraphQL.InputType('TickettypeUpdateManyWithoutSeasonsInput', {
  isAbstract: true,
})
export class TickettypeUpdateManyWithoutSeasonsInput {
  @TypeGraphQL.Field((_type) => [TickettypeCreateWithoutSeasonsInput], {
    nullable: true,
  })
    create?: TickettypeCreateWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TickettypeCreateOrConnectWithoutSeasonsInput], {
    nullable: true,
  })
    connectOrCreate?: TickettypeCreateOrConnectWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TickettypeUpsertWithWhereUniqueWithoutSeasonsInput], {
    nullable: true,
  })
    upsert?: TickettypeUpsertWithWhereUniqueWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field((_type) => TickettypeCreateManySeasonsInputEnvelope, {
    nullable: true,
  })
    createMany?: TickettypeCreateManySeasonsInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [TickettypeWhereUniqueInput], {
    nullable: true,
  })
    set?: TickettypeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TickettypeWhereUniqueInput], {
    nullable: true,
  })
    disconnect?: TickettypeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TickettypeWhereUniqueInput], {
    nullable: true,
  })
    delete?: TickettypeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TickettypeWhereUniqueInput], {
    nullable: true,
  })
    connect?: TickettypeWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TickettypeUpdateWithWhereUniqueWithoutSeasonsInput], {
    nullable: true,
  })
    update?: TickettypeUpdateWithWhereUniqueWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TickettypeUpdateManyWithWhereWithoutSeasonsInput], {
    nullable: true,
  })
    updateMany?: TickettypeUpdateManyWithWhereWithoutSeasonsInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TickettypeScalarWhereInput], {
    nullable: true,
  })
    deleteMany?: TickettypeScalarWhereInput[] | undefined;
}
