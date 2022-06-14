import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {ReservationCreateManyCustomersInputEnvelope} from '../inputs/ReservationCreateManyCustomersInputEnvelope';
import {ReservationCreateOrConnectWithoutCustomersInput} from '../inputs/ReservationCreateOrConnectWithoutCustomersInput';
import {ReservationCreateWithoutCustomersInput} from '../inputs/ReservationCreateWithoutCustomersInput';
import {ReservationWhereUniqueInput} from '../inputs/ReservationWhereUniqueInput';

@TypeGraphQL.InputType('ReservationCreateNestedManyWithoutCustomersInput', {
  isAbstract: true,
})
export class ReservationCreateNestedManyWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => [ReservationCreateWithoutCustomersInput], {
    nullable: true,
  })
    create?: ReservationCreateWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [ReservationCreateOrConnectWithoutCustomersInput], {
    nullable: true,
  })
    connectOrCreate?: ReservationCreateOrConnectWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => ReservationCreateManyCustomersInputEnvelope, {
    nullable: true,
  })
    createMany?: ReservationCreateManyCustomersInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [ReservationWhereUniqueInput], {
    nullable: true,
  })
    connect?: ReservationWhereUniqueInput[] | undefined;
}
