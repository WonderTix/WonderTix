import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {LinkedticketsCreateNestedManyWithoutTickettypeInput} from '../inputs/LinkedticketsCreateNestedManyWithoutTickettypeInput';
import {TicketsCreateNestedManyWithoutTickettypeInput} from '../inputs/TicketsCreateNestedManyWithoutTickettypeInput';

@TypeGraphQL.InputType('TickettypeCreateWithoutSeasonsInput', {
  isAbstract: true,
})
export class TickettypeCreateWithoutSeasonsInput {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
    id!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    name?: string | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    isseason?: boolean | undefined;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
    price?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
    concessions?: Prisma.Decimal | undefined;

  @TypeGraphQL.Field((_type) => LinkedticketsCreateNestedManyWithoutTickettypeInput, {
    nullable: true,
  })
    linkedtickets?: LinkedticketsCreateNestedManyWithoutTickettypeInput | undefined;

  @TypeGraphQL.Field((_type) => TicketsCreateNestedManyWithoutTickettypeInput, {
    nullable: true,
  })
    tickets?: TicketsCreateNestedManyWithoutTickettypeInput | undefined;
}
