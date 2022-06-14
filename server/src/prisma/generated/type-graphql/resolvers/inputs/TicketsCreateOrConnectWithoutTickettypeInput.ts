import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TicketsCreateWithoutTickettypeInput} from '../inputs/TicketsCreateWithoutTickettypeInput';
import {TicketsWhereUniqueInput} from '../inputs/TicketsWhereUniqueInput';

@TypeGraphQL.InputType('TicketsCreateOrConnectWithoutTickettypeInput', {
  isAbstract: true,
})
export class TicketsCreateOrConnectWithoutTickettypeInput {
  @TypeGraphQL.Field((_type) => TicketsWhereUniqueInput, {
    nullable: false,
  })
    where!: TicketsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TicketsCreateWithoutTickettypeInput, {
    nullable: false,
  })
    create!: TicketsCreateWithoutTickettypeInput;
}
