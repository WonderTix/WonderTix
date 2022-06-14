import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {UsersCreateOrConnectWithoutTask_task_assign_toTousersInput} from '../inputs/UsersCreateOrConnectWithoutTask_task_assign_toTousersInput';
import {UsersCreateWithoutTask_task_assign_toTousersInput} from '../inputs/UsersCreateWithoutTask_task_assign_toTousersInput';
import {UsersUpdateWithoutTask_task_assign_toTousersInput} from '../inputs/UsersUpdateWithoutTask_task_assign_toTousersInput';
import {UsersUpsertWithoutTask_task_assign_toTousersInput} from '../inputs/UsersUpsertWithoutTask_task_assign_toTousersInput';
import {UsersWhereUniqueInput} from '../inputs/UsersWhereUniqueInput';

@TypeGraphQL.InputType('UsersUpdateOneWithoutTask_task_assign_toTousersInput', {
  isAbstract: true,
})
export class UsersUpdateOneWithoutTask_task_assign_toTousersInput {
  @TypeGraphQL.Field((_type) => UsersCreateWithoutTask_task_assign_toTousersInput, {
    nullable: true,
  })
    create?: UsersCreateWithoutTask_task_assign_toTousersInput | undefined;

  @TypeGraphQL.Field((_type) => UsersCreateOrConnectWithoutTask_task_assign_toTousersInput, {
    nullable: true,
  })
    connectOrCreate?: UsersCreateOrConnectWithoutTask_task_assign_toTousersInput | undefined;

  @TypeGraphQL.Field((_type) => UsersUpsertWithoutTask_task_assign_toTousersInput, {
    nullable: true,
  })
    upsert?: UsersUpsertWithoutTask_task_assign_toTousersInput | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    disconnect?: boolean | undefined;

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    delete?: boolean | undefined;

  @TypeGraphQL.Field((_type) => UsersWhereUniqueInput, {
    nullable: true,
  })
    connect?: UsersWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => UsersUpdateWithoutTask_task_assign_toTousersInput, {
    nullable: true,
  })
    update?: UsersUpdateWithoutTask_task_assign_toTousersInput | undefined;
}
