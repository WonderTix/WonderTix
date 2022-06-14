import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DonationsCreateOrConnectWithoutTaskInput} from '../inputs/DonationsCreateOrConnectWithoutTaskInput';
import {DonationsCreateWithoutTaskInput} from '../inputs/DonationsCreateWithoutTaskInput';
import {DonationsWhereUniqueInput} from '../inputs/DonationsWhereUniqueInput';

@TypeGraphQL.InputType('DonationsCreateNestedOneWithoutTaskInput', {
  isAbstract: true,
})
export class DonationsCreateNestedOneWithoutTaskInput {
  @TypeGraphQL.Field((_type) => DonationsCreateWithoutTaskInput, {
    nullable: true,
  })
    create?: DonationsCreateWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => DonationsCreateOrConnectWithoutTaskInput, {
    nullable: true,
  })
    connectOrCreate?: DonationsCreateOrConnectWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => DonationsWhereUniqueInput, {
    nullable: true,
  })
    connect?: DonationsWhereUniqueInput | undefined;
}
