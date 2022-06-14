import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {TaskAvgAggregate} from '../outputs/TaskAvgAggregate';
import {TaskCountAggregate} from '../outputs/TaskCountAggregate';
import {TaskMaxAggregate} from '../outputs/TaskMaxAggregate';
import {TaskMinAggregate} from '../outputs/TaskMinAggregate';
import {TaskSumAggregate} from '../outputs/TaskSumAggregate';
import {state} from '../../enums/state';

@TypeGraphQL.ObjectType('TaskGroupBy', {
  isAbstract: true,
})
export class TaskGroupBy {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
    id!: number;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    parent_id!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    subject!: string | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    description!: string | null;

  @TypeGraphQL.Field((_type) => state, {
    nullable: true,
  })
    status!: 'not_started' | 'in_progress' | 'completed' | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    assign_to!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    report_to!: number | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    date_created!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    date_assigned!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    due_date!: Date | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    rel_contact!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    rel_donation!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    rel_ticket_order!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    rel_account!: number | null;

  @TypeGraphQL.Field((_type) => TaskCountAggregate, {
    nullable: true,
  })
    _count!: TaskCountAggregate | null;

  @TypeGraphQL.Field((_type) => TaskAvgAggregate, {
    nullable: true,
  })
    _avg!: TaskAvgAggregate | null;

  @TypeGraphQL.Field((_type) => TaskSumAggregate, {
    nullable: true,
  })
    _sum!: TaskSumAggregate | null;

  @TypeGraphQL.Field((_type) => TaskMinAggregate, {
    nullable: true,
  })
    _min!: TaskMinAggregate | null;

  @TypeGraphQL.Field((_type) => TaskMaxAggregate, {
    nullable: true,
  })
    _max!: TaskMaxAggregate | null;
}
