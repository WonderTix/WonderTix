import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TicketsCreateManyCustomersInputEnvelope} from '../inputs/TicketsCreateManyCustomersInputEnvelope';
import {TicketsCreateOrConnectWithoutCustomersInput} from '../inputs/TicketsCreateOrConnectWithoutCustomersInput';
import {TicketsCreateWithoutCustomersInput} from '../inputs/TicketsCreateWithoutCustomersInput';
import {TicketsWhereUniqueInput} from '../inputs/TicketsWhereUniqueInput';

@TypeGraphQL.InputType('TicketsCreateNestedManyWithoutCustomersInput', {
  isAbstract: true,
})
export class TicketsCreateNestedManyWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => [TicketsCreateWithoutCustomersInput], {
    nullable: true,
  })
    create?: TicketsCreateWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => [TicketsCreateOrConnectWithoutCustomersInput], {
    nullable: true,
  })
    connectOrCreate?: TicketsCreateOrConnectWithoutCustomersInput[] | undefined;

  @TypeGraphQL.Field((_type) => TicketsCreateManyCustomersInputEnvelope, {
    nullable: true,
  })
    createMany?: TicketsCreateManyCustomersInputEnvelope | undefined;

  @TypeGraphQL.Field((_type) => [TicketsWhereUniqueInput], {
    nullable: true,
  })
    connect?: TicketsWhereUniqueInput[] | undefined;
}
