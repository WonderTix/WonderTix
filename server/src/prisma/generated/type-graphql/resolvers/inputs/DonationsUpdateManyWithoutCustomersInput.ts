import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DonationsCreateManyCustomersInputEnvelope} from '../inputs/DonationsCreateManyCustomersInputEnvelope';
import {DonationsCreateOrConnectWithoutCustomersInput} from '../inputs/DonationsCreateOrConnectWithoutCustomersInput';
import {DonationsCreateWithoutCustomersInput} from '../inputs/DonationsCreateWithoutCustomersInput';
import {DonationsScalarWhereInput} from '../inputs/DonationsScalarWhereInput';
import {DonationsUpdateManyWithWhereWithoutCustomersInput} from '../inputs/DonationsUpdateManyWithWhereWithoutCustomersInput';
import {DonationsUpdateWithWhereUniqueWithoutCustomersInput} from '../inputs/DonationsUpdateWithWhereUniqueWithoutCustomersInput';
import {DonationsUpsertWithWhereUniqueWithoutCustomersInput} from '../inputs/DonationsUpsertWithWhereUniqueWithoutCustomersInput';
import {DonationsWhereUniqueInput} from '../inputs/DonationsWhereUniqueInput';

@TypeGraphQL.InputType('DonationsUpdateManyWithoutCustomersInput', {
  isAbstract: true,
})
export class DonationsUpdateManyWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => [DonationsCreateWithoutCustomersInput], {
    nullable: true,
  })
    create?: DonationsCreateWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsCreateOrConnectWithoutCustomersInput], {
    nullable: true,
  })
    connectOrCreate?: DonationsCreateOrConnectWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsUpsertWithWhereUniqueWithoutCustomersInput], {
    nullable: true,
  })
    upsert?: DonationsUpsertWithWhereUniqueWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => DonationsCreateManyCustomersInputEnvelope, {
    nullable: true,
  })
    createMany?: DonationsCreateManyCustomersInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [DonationsWhereUniqueInput], {
    nullable: true,
  })
    set?: DonationsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsWhereUniqueInput], {
    nullable: true,
  })
    disconnect?: DonationsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsWhereUniqueInput], {
    nullable: true,
  })
    delete?: DonationsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsWhereUniqueInput], {
    nullable: true,
  })
    connect?: DonationsWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsUpdateWithWhereUniqueWithoutCustomersInput], {
    nullable: true,
  })
    update?: DonationsUpdateWithWhereUniqueWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsUpdateManyWithWhereWithoutCustomersInput], {
    nullable: true,
  })
    updateMany?: DonationsUpdateManyWithWhereWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsScalarWhereInput], {
    nullable: true,
  })
    deleteMany?: DonationsScalarWhereInput[] | undefined;
}
