import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Task_notesAvgAggregate } from "../outputs/Task_notesAvgAggregate";
import { Task_notesCountAggregate } from "../outputs/Task_notesCountAggregate";
import { Task_notesMaxAggregate } from "../outputs/Task_notesMaxAggregate";
import { Task_notesMinAggregate } from "../outputs/Task_notesMinAggregate";
import { Task_notesSumAggregate } from "../outputs/Task_notesSumAggregate";

@TypeGraphQL.ObjectType("AggregateTask_notes", {
  isAbstract: true
})
export class AggregateTask_notes {
  @TypeGraphQL.Field(_type => Task_notesCountAggregate, {
    nullable: true
  })
  _count!: Task_notesCountAggregate | null;

  @TypeGraphQL.Field(_type => Task_notesAvgAggregate, {
    nullable: true
  })
  _avg!: Task_notesAvgAggregate | null;

  @TypeGraphQL.Field(_type => Task_notesSumAggregate, {
    nullable: true
  })
  _sum!: Task_notesSumAggregate | null;

  @TypeGraphQL.Field(_type => Task_notesMinAggregate, {
    nullable: true
  })
  _min!: Task_notesMinAggregate | null;

  @TypeGraphQL.Field(_type => Task_notesMaxAggregate, {
    nullable: true
  })
  _max!: Task_notesMaxAggregate | null;
}
