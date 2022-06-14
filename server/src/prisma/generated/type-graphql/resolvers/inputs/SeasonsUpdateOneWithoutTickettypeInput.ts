import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {SeasonsCreateOrConnectWithoutTickettypeInput} from '../inputs/SeasonsCreateOrConnectWithoutTickettypeInput';
import {SeasonsCreateWithoutTickettypeInput} from '../inputs/SeasonsCreateWithoutTickettypeInput';
import {SeasonsUpdateWithoutTickettypeInput} from '../inputs/SeasonsUpdateWithoutTickettypeInput';
import {SeasonsUpsertWithoutTickettypeInput} from '../inputs/SeasonsUpsertWithoutTickettypeInput';
import {SeasonsWhereUniqueInput} from '../inputs/SeasonsWhereUniqueInput';

@TypeGraphQL.InputType('SeasonsUpdateOneWithoutTickettypeInput', {
  isAbstract: true,
})
export class SeasonsUpdateOneWithoutTickettypeInput {
  @TypeGraphQL.Field((_type) => SeasonsCreateWithoutTickettypeInput, {
    nullable: true,
  })
    create?: SeasonsCreateWithoutTickettypeInput | undefined;

  @TypeGraphQL.Field((_type) => SeasonsCreateOrConnectWithoutTickettypeInput, {
    nullable: true,
  })
    connectOrCreate?: SeasonsCreateOrConnectWithoutTickettypeInput | undefined;

  @TypeGraphQL.Field((_type) => SeasonsUpsertWithoutTickettypeInput, {
    nullable: true,
  })
    upsert?: SeasonsUpsertWithoutTickettypeInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => SeasonsWhereUniqueInput, {
    nullable: true,
  })
    connect?: SeasonsWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => SeasonsUpdateWithoutTickettypeInput, {
    nullable: true,
  })
    update?: SeasonsUpdateWithoutTickettypeInput | undefined;
}
