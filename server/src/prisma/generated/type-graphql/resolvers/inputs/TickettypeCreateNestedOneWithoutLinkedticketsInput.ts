import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TickettypeCreateOrConnectWithoutLinkedticketsInput} from '../inputs/TickettypeCreateOrConnectWithoutLinkedticketsInput';
import {TickettypeCreateWithoutLinkedticketsInput} from '../inputs/TickettypeCreateWithoutLinkedticketsInput';
import {TickettypeWhereUniqueInput} from '../inputs/TickettypeWhereUniqueInput';

@TypeGraphQL.InputType('TickettypeCreateNestedOneWithoutLinkedticketsInput', {
  isAbstract: true,
})
export class TickettypeCreateNestedOneWithoutLinkedticketsInput {
  @TypeGraphQL.Field((_type) => TickettypeCreateWithoutLinkedticketsInput, {
    nullable: true,
  })
    create?: TickettypeCreateWithoutLinkedticketsInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeCreateOrConnectWithoutLinkedticketsInput, {
    nullable: true,
  })
    connectOrCreate?: TickettypeCreateOrConnectWithoutLinkedticketsInput | undefined;

  @TypeGraphQL.Field((_type) => TickettypeWhereUniqueInput, {
    nullable: true,
  })
    connect?: TickettypeWhereUniqueInput | undefined;
}
