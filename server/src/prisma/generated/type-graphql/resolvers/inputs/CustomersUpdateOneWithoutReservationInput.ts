import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateOrConnectWithoutReservationInput} from '../inputs/CustomersCreateOrConnectWithoutReservationInput';
import {CustomersCreateWithoutReservationInput} from '../inputs/CustomersCreateWithoutReservationInput';
import {CustomersUpdateWithoutReservationInput} from '../inputs/CustomersUpdateWithoutReservationInput';
import {CustomersUpsertWithoutReservationInput} from '../inputs/CustomersUpsertWithoutReservationInput';
import {CustomersWhereUniqueInput} from '../inputs/CustomersWhereUniqueInput';

@TypeGraphQL.InputType('CustomersUpdateOneWithoutReservationInput', {
  isAbstract: true,
})
export class CustomersUpdateOneWithoutReservationInput {
  @TypeGraphQL.Field((_type) => CustomersCreateWithoutReservationInput, {
    nullable: true,
  })
    create?: CustomersCreateWithoutReservationInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersCreateOrConnectWithoutReservationInput, {
    nullable: true,
  })
    connectOrCreate?: CustomersCreateOrConnectWithoutReservationInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersUpsertWithoutReservationInput, {
    nullable: true,
  })
    upsert?: CustomersUpsertWithoutReservationInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => CustomersWhereUniqueInput, {
    nullable: true,
  })
    connect?: CustomersWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersUpdateWithoutReservationInput, {
    nullable: true,
  })
    update?: CustomersUpdateWithoutReservationInput | undefined;
}
