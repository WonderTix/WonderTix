import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TickettypeCreateOrConnectWithoutLinkedticketsInput} from '../inputs/TickettypeCreateOrConnectWithoutLinkedticketsInput';
import {TickettypeCreateWithoutLinkedticketsInput} from '../inputs/TickettypeCreateWithoutLinkedticketsInput';
import {TickettypeUpdateWithoutLinkedticketsInput} from '../inputs/TickettypeUpdateWithoutLinkedticketsInput';
import {TickettypeUpsertWithoutLinkedticketsInput} from '../inputs/TickettypeUpsertWithoutLinkedticketsInput';
import {TickettypeWhereUniqueInput} from '../inputs/TickettypeWhereUniqueInput';

@TypeGraphQL.InputType('TickettypeUpdateOneWithoutLinkedticketsInput', {
  isAbstract: true,
})
export class TickettypeUpdateOneWithoutLinkedticketsInput {
  @TypeGraphQL.Field((_type) => TickettypeCreateWithoutLinkedticketsInput, {
    nullable: true,
  })
    create?: TickettypeCreateWithoutLinkedticketsInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeCreateOrConnectWithoutLinkedticketsInput, {
    nullable: true,
  })
    connectOrCreate?: TickettypeCreateOrConnectWithoutLinkedticketsInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeUpsertWithoutLinkedticketsInput, {
    nullable: true,
  })
    upsert?: TickettypeUpsertWithoutLinkedticketsInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => TickettypeWhereUniqueInput, {
    nullable: true,
  })
    connect?: TickettypeWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeUpdateWithoutLinkedticketsInput, {
    nullable: true,
  })
    update?: TickettypeUpdateWithoutLinkedticketsInput | undefined;
}
