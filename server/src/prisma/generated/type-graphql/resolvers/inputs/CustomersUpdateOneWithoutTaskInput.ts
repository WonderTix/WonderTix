import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {CustomersCreateOrConnectWithoutTaskInput} from '../inputs/CustomersCreateOrConnectWithoutTaskInput';
import {CustomersCreateWithoutTaskInput} from '../inputs/CustomersCreateWithoutTaskInput';
import {CustomersUpdateWithoutTaskInput} from '../inputs/CustomersUpdateWithoutTaskInput';
import {CustomersUpsertWithoutTaskInput} from '../inputs/CustomersUpsertWithoutTaskInput';
import {CustomersWhereUniqueInput} from '../inputs/CustomersWhereUniqueInput';

@TypeGraphQL.InputType('CustomersUpdateOneWithoutTaskInput', {
  isAbstract: true,
})
export class CustomersUpdateOneWithoutTaskInput {
  @TypeGraphQL.Field((_type) => CustomersCreateWithoutTaskInput, {
    nullable: true,
  })
    create?: CustomersCreateWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersCreateOrConnectWithoutTaskInput, {
    nullable: true,
  })
    connectOrCreate?: CustomersCreateOrConnectWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersUpsertWithoutTaskInput, {
    nullable: true,
  })
    upsert?: CustomersUpsertWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => CustomersWhereUniqueInput, {
    nullable: true,
  })
    connect?: CustomersWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => CustomersUpdateWithoutTaskInput, {
    nullable: true,
  })
    update?: CustomersUpdateWithoutTaskInput | undefined;
}
