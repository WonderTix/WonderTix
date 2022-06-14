import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {Event_instancesCreateOrConnectWithoutLinkedticketsInput} from '../inputs/Event_instancesCreateOrConnectWithoutLinkedticketsInput';
import {Event_instancesCreateWithoutLinkedticketsInput} from '../inputs/Event_instancesCreateWithoutLinkedticketsInput';
import {Event_instancesUpdateWithoutLinkedticketsInput} from '../inputs/Event_instancesUpdateWithoutLinkedticketsInput';
import {Event_instancesUpsertWithoutLinkedticketsInput} from '../inputs/Event_instancesUpsertWithoutLinkedticketsInput';
import {Event_instancesWhereUniqueInput} from '../inputs/Event_instancesWhereUniqueInput';

@TypeGraphQL.InputType('Event_instancesUpdateOneWithoutLinkedticketsInput', {
  isAbstract: true,
})
export class Event_instancesUpdateOneWithoutLinkedticketsInput {
  @TypeGraphQL.Field((_type) => Event_instancesCreateWithoutLinkedticketsInput, {
    nullable: true,
  })
    create?: Event_instancesCreateWithoutLinkedticketsInput | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesCreateOrConnectWithoutLinkedticketsInput, {
    nullable: true,
  })
    connectOrCreate?: Event_instancesCreateOrConnectWithoutLinkedticketsInput | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesUpsertWithoutLinkedticketsInput, {
    nullable: true,
  })
    upsert?: Event_instancesUpsertWithoutLinkedticketsInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesWhereUniqueInput, {
    nullable: true,
  })
    connect?: Event_instancesWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => Event_instancesUpdateWithoutLinkedticketsInput, {
    nullable: true,
  })
    update?: Event_instancesUpdateWithoutLinkedticketsInput | undefined;
}
