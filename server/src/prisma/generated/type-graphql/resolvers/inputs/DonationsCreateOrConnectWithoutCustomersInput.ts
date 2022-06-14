import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DonationsCreateWithoutCustomersInput} from '../inputs/DonationsCreateWithoutCustomersInput';
import {DonationsWhereUniqueInput} from '../inputs/DonationsWhereUniqueInput';

@TypeGraphQL.InputType('DonationsCreateOrConnectWithoutCustomersInput', {
  isAbstract: true,
})
export class DonationsCreateOrConnectWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => DonationsWhereUniqueInput, {
    nullable: false,
  })
    where!: DonationsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => DonationsCreateWithoutCustomersInput, {
    nullable: false,
  })
    create!: DonationsCreateWithoutCustomersInput;
}
