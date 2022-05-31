import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TicketsAvgAggregate } from "../outputs/TicketsAvgAggregate";
import { TicketsCountAggregate } from "../outputs/TicketsCountAggregate";
import { TicketsMaxAggregate } from "../outputs/TicketsMaxAggregate";
import { TicketsMinAggregate } from "../outputs/TicketsMinAggregate";
import { TicketsSumAggregate } from "../outputs/TicketsSumAggregate";

@TypeGraphQL.ObjectType("AggregateTickets", {
  isAbstract: true
})
export class AggregateTickets {
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
