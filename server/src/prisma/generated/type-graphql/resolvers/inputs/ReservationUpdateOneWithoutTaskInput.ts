import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {ReservationCreateOrConnectWithoutTaskInput} from '../inputs/ReservationCreateOrConnectWithoutTaskInput';
import {ReservationCreateWithoutTaskInput} from '../inputs/ReservationCreateWithoutTaskInput';
import {ReservationUpdateWithoutTaskInput} from '../inputs/ReservationUpdateWithoutTaskInput';
import {ReservationUpsertWithoutTaskInput} from '../inputs/ReservationUpsertWithoutTaskInput';
import {ReservationWhereUniqueInput} from '../inputs/ReservationWhereUniqueInput';

@TypeGraphQL.InputType('ReservationUpdateOneWithoutTaskInput', {
  isAbstract: true,
})
export class ReservationUpdateOneWithoutTaskInput {
  @TypeGraphQL.Field((_type) => ReservationCreateWithoutTaskInput, {
    nullable: true,
  })
    create?: ReservationCreateWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => ReservationCreateOrConnectWithoutTaskInput, {
    nullable: true,
  })
    connectOrCreate?: ReservationCreateOrConnectWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => ReservationUpsertWithoutTaskInput, {
    nullable: true,
  })
    upsert?: ReservationUpsertWithoutTaskInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => ReservationWhereUniqueInput, {
    nullable: true,
  })
    connect?: ReservationWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => ReservationUpdateWithoutTaskInput, {
    nullable: true,
  })
    update?: ReservationUpdateWithoutTaskInput | undefined;
}
