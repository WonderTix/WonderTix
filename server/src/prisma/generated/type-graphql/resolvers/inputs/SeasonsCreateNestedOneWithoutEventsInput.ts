import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {SeasonsCreateOrConnectWithoutEventsInput} from '../inputs/SeasonsCreateOrConnectWithoutEventsInput';
import {SeasonsCreateWithoutEventsInput} from '../inputs/SeasonsCreateWithoutEventsInput';
import {SeasonsWhereUniqueInput} from '../inputs/SeasonsWhereUniqueInput';

@TypeGraphQL.InputType('SeasonsCreateNestedOneWithoutEventsInput', {
  isAbstract: true,
})
export class SeasonsCreateNestedOneWithoutEventsInput {
  @TypeGraphQL.Field((_type) => SeasonsCreateWithoutEventsInput, {
    nullable: true,
  })
    create?: SeasonsCreateWithoutEventsInput | undefined;

  @TypeGraphQL.Field((_type) => SeasonsCreateOrConnectWithoutEventsInput, {
    nullable: true,
  })
    connectOrCreate?: SeasonsCreateOrConnectWithoutEventsInput | undefined;

  @TypeGraphQL.Field((_type) => SeasonsWhereUniqueInput, {
    nullable: true,
  })
    connect?: SeasonsWhereUniqueInput | undefined;
}
