import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TicketsUpdateWithoutTickettypeInput} from '../inputs/TicketsUpdateWithoutTickettypeInput';
import {TicketsWhereUniqueInput} from '../inputs/TicketsWhereUniqueInput';

@TypeGraphQL.InputType('TicketsUpdateWithWhereUniqueWithoutTickettypeInput', {
  isAbstract: true,
})
export class TicketsUpdateWithWhereUniqueWithoutTickettypeInput {
  @TypeGraphQL.Field((_type) => TicketsWhereUniqueInput, {
    nullable: false,
  })
    where!: TicketsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TicketsUpdateWithoutTickettypeInput, {
    nullable: false,
  })
    data!: TicketsUpdateWithoutTickettypeInput;
}
