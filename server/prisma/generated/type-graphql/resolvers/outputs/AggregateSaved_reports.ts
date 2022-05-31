import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Saved_reportsAvgAggregate } from "../outputs/Saved_reportsAvgAggregate";
import { Saved_reportsCountAggregate } from "../outputs/Saved_reportsCountAggregate";
import { Saved_reportsMaxAggregate } from "../outputs/Saved_reportsMaxAggregate";
import { Saved_reportsMinAggregate } from "../outputs/Saved_reportsMinAggregate";
import { Saved_reportsSumAggregate } from "../outputs/Saved_reportsSumAggregate";

@TypeGraphQL.ObjectType("AggregateSaved_reports", {
  isAbstract: true
})
export class AggregateSaved_reports {
  @TypeGraphQL.Field(_type => Saved_reportsCountAggregate, {
    nullable: true
  })
  _count!: Saved_reportsCountAggregate | null;

  @TypeGraphQL.Field(_type => Saved_reportsAvgAggregate, {
    nullable: true
  })
  _avg!: Saved_reportsAvgAggregate | null;

  @TypeGraphQL.Field(_type => Saved_reportsSumAggregate, {
    nullable: true
  })
  _sum!: Saved_reportsSumAggregate | null;

  @TypeGraphQL.Field(_type => Saved_reportsMinAggregate, {
    nullable: true
  })
  _min!: Saved_reportsMinAggregate | null;

  @TypeGraphQL.Field(_type => Saved_reportsMaxAggregate, {
    nullable: true
  })
  _max!: Saved_reportsMaxAggregate | null;
}
