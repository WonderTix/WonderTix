import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Event_instancesAvgAggregate } from "../outputs/Event_instancesAvgAggregate";
import { Event_instancesCountAggregate } from "../outputs/Event_instancesCountAggregate";
import { Event_instancesMaxAggregate } from "../outputs/Event_instancesMaxAggregate";
import { Event_instancesMinAggregate } from "../outputs/Event_instancesMinAggregate";
import { Event_instancesSumAggregate } from "../outputs/Event_instancesSumAggregate";

@TypeGraphQL.ObjectType("AggregateEvent_instances", {
  isAbstract: true
})
export class AggregateEvent_instances {
  @TypeGraphQL.Field(_type => Event_instancesCountAggregate, {
    nullable: true
  })
  _count!: Event_instancesCountAggregate | null;

  @TypeGraphQL.Field(_type => Event_instancesAvgAggregate, {
    nullable: true
  })
  _avg!: Event_instancesAvgAggregate | null;

  @TypeGraphQL.Field(_type => Event_instancesSumAggregate, {
    nullable: true
  })
  _sum!: Event_instancesSumAggregate | null;

  @TypeGraphQL.Field(_type => Event_instancesMinAggregate, {
    nullable: true
  })
  _min!: Event_instancesMinAggregate | null;

  @TypeGraphQL.Field(_type => Event_instancesMaxAggregate, {
    nullable: true
  })
  _max!: Event_instancesMaxAggregate | null;
}
