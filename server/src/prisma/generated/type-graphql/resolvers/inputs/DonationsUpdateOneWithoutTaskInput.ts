import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DonationsCreateOrConnectWithoutTaskInput} from '../inputs/DonationsCreateOrConnectWithoutTaskInput';
import {DonationsCreateWithoutTaskInput} from '../inputs/DonationsCreateWithoutTaskInput';
import {DonationsUpdateWithoutTaskInput} from '../inputs/DonationsUpdateWithoutTaskInput';
import {DonationsUpsertWithoutTaskInput} from '../inputs/DonationsUpsertWithoutTaskInput';
import {DonationsWhereUniqueInput} from '../inputs/DonationsWhereUniqueInput';

@TypeGraphQL.InputType('DonationsUpdateOneWithoutTaskInput', {
  isAbstract: true,
})
export class DonationsUpdateOneWithoutTaskInput {
  @TypeGraphQL.Field((_type) => DonationsCreateWithoutTaskInput, {
    nullable: true,
  })
    create?: DonationsCreateWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => DonationsCreateOrConnectWithoutTaskInput, {
    nullable: true,
  })
    connectOrCreate?: DonationsCreateOrConnectWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => DonationsUpsertWithoutTaskInput, {
    nullable: true,
  })
    upsert?: DonationsUpsertWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => DonationsWhereUniqueInput, {
    nullable: true,
  })
    connect?: DonationsWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => DonationsUpdateWithoutTaskInput, {
    nullable: true,
  })
    update?: DonationsUpdateWithoutTaskInput | undefined;
}
