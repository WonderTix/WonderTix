import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TicketsAvgAggregate } from "../outputs/TicketsAvgAggregate";
import { TicketsCountAggregate } from "../outputs/TicketsCountAggregate";
import { TicketsMaxAggregate } from "../outputs/TicketsMaxAggregate";
import { TicketsMinAggregate } from "../outputs/TicketsMinAggregate";
import { TicketsSumAggregate } from "../outputs/TicketsSumAggregate";

@TypeGraphQL.ObjectType("TicketsGroupBy", {
  isAbstract: true
})
export class TicketsGroupBy {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  ticketno!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  type!: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  eventinstanceid!: number | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  custid!: number | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  paid!: boolean | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  active!: boolean | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  checkedin!: boolean | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  checkedin_ts!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  payment_intent!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  comments!: string | null;

  @TypeGraphQL.Field(_type => TicketsCountAggregate, {
    nullable: true
  })
  _count!: TicketsCountAggregate | null;

  @TypeGraphQL.Field(_type => TicketsAvgAggregate, {
    nullable: true
  })
  _avg!: TicketsAvgAggregate | null;

  @TypeGraphQL.Field(_type => TicketsSumAggregate, {
    nullable: true
  })
  _sum!: TicketsSumAggregate | null;

  @TypeGraphQL.Field(_type => TicketsMinAggregate, {
    nullable: true
  })
  _min!: TicketsMinAggregate | null;

  @TypeGraphQL.Field(_type => TicketsMaxAggregate, {
    nullable: true
  })
  _max!: TicketsMaxAggregate | null;
}
