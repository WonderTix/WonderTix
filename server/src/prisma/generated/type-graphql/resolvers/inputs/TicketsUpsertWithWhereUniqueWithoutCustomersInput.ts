import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TicketsCreateWithoutCustomersInput} from '../inputs/TicketsCreateWithoutCustomersInput';
import {TicketsUpdateWithoutCustomersInput} from '../inputs/TicketsUpdateWithoutCustomersInput';
import {TicketsWhereUniqueInput} from '../inputs/TicketsWhereUniqueInput';

@TypeGraphQL.InputType('TicketsUpsertWithWhereUniqueWithoutCustomersInput', {
  isAbstract: true,
})
export class TicketsUpsertWithWhereUniqueWithoutCustomersInput {
  @TypeGraphQL.Field((_type) => TicketsWhereUniqueInput, {
    nullable: false,
  })
    where!: TicketsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TicketsUpdateWithoutCustomersInput, {
    nullable: false,
  })
    update!: TicketsUpdateWithoutCustomersInput;

  @TypeGraphQL.Field((_type) => TicketsCreateWithoutCustomersInput, {
    nullable: false,
  })
    create!: TicketsCreateWithoutCustomersInput;
}
