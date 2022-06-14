import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DonationsCreateManyCustomersInputEnvelope} from '../inputs/DonationsCreateManyCustomersInputEnvelope';
import {DonationsCreateOrConnectWithoutCustomersInput} from '../inputs/DonationsCreateOrConnectWithoutCustomersInput';
import {DonationsCreateWithoutCustomersInput} from '../inputs/DonationsCreateWithoutCustomersInput';
import {DonationsWhereUniqueInput} from '../inputs/DonationsWhereUniqueInput';

@TypeGraphQL.InputType('DonationsCreateNestedManyWithoutCustomersInput', {
  isAbstract: true,
})
export class DonationsCreateNestedManyWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => [DonationsCreateWithoutCustomersInput], {
    nullable: true,
  })
    create?: DonationsCreateWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DonationsCreateOrConnectWithoutCustomersInput], {
    nullable: true,
  })
    connectOrCreate?: DonationsCreateOrConnectWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => DonationsCreateManyCustomersInputEnvelope, {
    nullable: true,
  })
    createMany?: DonationsCreateManyCustomersInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [DonationsWhereUniqueInput], {
    nullable: true,
  })
    connect?: DonationsWhereUniqueInput[] | undefined;
}
