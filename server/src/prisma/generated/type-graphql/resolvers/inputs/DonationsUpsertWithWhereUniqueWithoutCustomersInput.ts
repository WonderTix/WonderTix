import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DonationsCreateWithoutCustomersInput} from '../inputs/DonationsCreateWithoutCustomersInput';
import {DonationsUpdateWithoutCustomersInput} from '../inputs/DonationsUpdateWithoutCustomersInput';
import {DonationsWhereUniqueInput} from '../inputs/DonationsWhereUniqueInput';

@TypeGraphQL.InputType('DonationsUpsertWithWhereUniqueWithoutCustomersInput', {
  isAbstract: true,
})
export class DonationsUpsertWithWhereUniqueWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => DonationsWhereUniqueInput, {
    nullable: false,
  })
    where!: DonationsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => DonationsUpdateWithoutCustomersInput, {
    nullable: false,
  })
    update!: DonationsUpdateWithoutCustomersInput;

  @TypeGraphQL.Field((_type) => DonationsCreateWithoutCustomersInput, {
    nullable: false,
  })
    create!: DonationsCreateWithoutCustomersInput;
}
