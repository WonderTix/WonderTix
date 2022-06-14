import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskOrderByRelationAggregateInput} from '../inputs/TaskOrderByRelationAggregateInput';
import {SortOrder} from '../../enums/SortOrder';

@TypeGraphQL.InputType('UsersOrderByWithRelationInput', {
  isAbstract: true,
})
export class UsersOrderByWithRelationInput {
  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    id?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    username?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    pass_hash?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => SortOrder, {
    nullable: true,
  })
    is_superadmin?: 'asc' | 'desc' | undefined;

  @TypeGraphQL.Field((_type) => TaskOrderByRelationAggregateInput, {
    nullable: true,
  })
    task_task_assign_toTousers?: TaskOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field((_type) => TaskOrderByRelationAggregateInput, {
    nullable: true,
  })
    task_task_report_toTousers?: TaskOrderByRelationAggregateInput | undefined;
}
