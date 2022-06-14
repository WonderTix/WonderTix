import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TicketsCreateWithoutEvent_instancesInput} from '../inputs/TicketsCreateWithoutEvent_instancesInput';
import {TicketsUpdateWithoutEvent_instancesInput} from '../inputs/TicketsUpdateWithoutEvent_instancesInput';
import {TicketsWhereUniqueInput} from '../inputs/TicketsWhereUniqueInput';

@TypeGraphQL.InputType('TicketsUpsertWithWhereUniqueWithoutEvent_instancesInput', {
  isAbstract: true,
})
export class TicketsUpsertWithWhereUniqueWithoutEvent_instancesInput {
  @TypeGraphQL.Field((_type) => TicketsWhereUniqueInput, {
    nullable: false,
  })
    where!: TicketsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TicketsUpdateWithoutEvent_instancesInput, {
    nullable: false,
  })
    update!: TicketsUpdateWithoutEvent_instancesInput;

  @TypeGraphQL.Field((_type) => TicketsCreateWithoutEvent_instancesInput, {
    nullable: false,
  })
    create!: TicketsCreateWithoutEvent_instancesInput;
}
