import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { EventsAvgAggregate } from "../outputs/EventsAvgAggregate";
import { EventsCountAggregate } from "../outputs/EventsCountAggregate";
import { EventsMaxAggregate } from "../outputs/EventsMaxAggregate";
import { EventsMinAggregate } from "../outputs/EventsMinAggregate";
import { EventsSumAggregate } from "../outputs/EventsSumAggregate";

@TypeGraphQL.ObjectType("EventsGroupBy", {
  isAbstract: true
})
export class EventsGroupBy {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  seasonid!: number | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  eventname!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  eventdescription!: string | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  active!: boolean | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  image_url!: string | null;

  @TypeGraphQL.Field(_type => EventsCountAggregate, {
    nullable: true
  })
  _count!: EventsCountAggregate | null;

  @TypeGraphQL.Field(_type => EventsAvgAggregate, {
    nullable: true
  })
  _avg!: EventsAvgAggregate | null;

  @TypeGraphQL.Field(_type => EventsSumAggregate, {
    nullable: true
  })
  _sum!: EventsSumAggregate | null;

  @TypeGraphQL.Field(_type => EventsMinAggregate, {
    nullable: true
  })
  _min!: EventsMinAggregate | null;

  @TypeGraphQL.Field(_type => EventsMaxAggregate, {
    nullable: true
  })
  _max!: EventsMaxAggregate | null;
}
