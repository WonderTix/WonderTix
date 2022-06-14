import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {SeasonsCreateWithoutEventsInput} from '../inputs/SeasonsCreateWithoutEventsInput';
import {SeasonsWhereUniqueInput} from '../inputs/SeasonsWhereUniqueInput';

@TypeGraphQL.InputType('SeasonsCreateOrConnectWithoutEventsInput', {
  isAbstract: true,
})
export class SeasonsCreateOrConnectWithoutEventsInput {
  @TypeGraphQL.Field((_type) => SeasonsWhereUniqueInput, {
    nullable: false,
  })
    where!: SeasonsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => SeasonsCreateWithoutEventsInput, {
    nullable: false,
  })
    create!: SeasonsCreateWithoutEventsInput;
}
