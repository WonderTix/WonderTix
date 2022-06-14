import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TickettypeCreateWithoutSeasonsInput} from '../inputs/TickettypeCreateWithoutSeasonsInput';
import {TickettypeUpdateWithoutSeasonsInput} from '../inputs/TickettypeUpdateWithoutSeasonsInput';
import {TickettypeWhereUniqueInput} from '../inputs/TickettypeWhereUniqueInput';

@TypeGraphQL.InputType('TickettypeUpsertWithWhereUniqueWithoutSeasonsInput', {
  isAbstract: true,
})
export class TickettypeUpsertWithWhereUniqueWithoutSeasonsInput {
  @TypeGraphQL.Field((_type) => TickettypeWhereUniqueInput, {
    nullable: false,
  })
    where!: TickettypeWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TickettypeUpdateWithoutSeasonsInput, {
    nullable: false,
  })
    update!: TickettypeUpdateWithoutSeasonsInput;

  @TypeGraphQL.Field((_type) => TickettypeCreateWithoutSeasonsInput, {
    nullable: false,
  })
    create!: TickettypeCreateWithoutSeasonsInput;
}
