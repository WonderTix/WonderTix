import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TickettypeCreateWithoutTicketsInput} from '../inputs/TickettypeCreateWithoutTicketsInput';
import {TickettypeWhereUniqueInput} from '../inputs/TickettypeWhereUniqueInput';

@TypeGraphQL.InputType('TickettypeCreateOrConnectWithoutTicketsInput', {
  isAbstract: true,
})
export class TickettypeCreateOrConnectWithoutTicketsInput {
  @TypeGraphQL.Field((_type) => TickettypeWhereUniqueInput, {
    nullable: false,
  })
    where!: TickettypeWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TickettypeCreateWithoutTicketsInput, {
    nullable: false,
  })
    create!: TickettypeCreateWithoutTicketsInput;
}
