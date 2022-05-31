import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TickettypeAvgAggregate } from "../outputs/TickettypeAvgAggregate";
import { TickettypeCountAggregate } from "../outputs/TickettypeCountAggregate";
import { TickettypeMaxAggregate } from "../outputs/TickettypeMaxAggregate";
import { TickettypeMinAggregate } from "../outputs/TickettypeMinAggregate";
import { TickettypeSumAggregate } from "../outputs/TickettypeSumAggregate";

@TypeGraphQL.ObjectType("TickettypeGroupBy", {
  isAbstract: true
})
export class TickettypeGroupBy {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name!: string | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isseason!: boolean | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  seasonid!: number | null;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  price!: Prisma.Decimal | null;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  concessions!: Prisma.Decimal | null;

  @TypeGraphQL.Field(_type => TickettypeCountAggregate, {
    nullable: true
  })
  _count!: TickettypeCountAggregate | null;

  @TypeGraphQL.Field(_type => TickettypeAvgAggregate, {
    nullable: true
  })
  _avg!: TickettypeAvgAggregate | null;

  @TypeGraphQL.Field(_type => TickettypeSumAggregate, {
    nullable: true
  })
  _sum!: TickettypeSumAggregate | null;

  @TypeGraphQL.Field(_type => TickettypeMinAggregate, {
    nullable: true
  })
  _min!: TickettypeMinAggregate | null;

  @TypeGraphQL.Field(_type => TickettypeMaxAggregate, {
    nullable: true
  })
  _max!: TickettypeMaxAggregate | null;
}
