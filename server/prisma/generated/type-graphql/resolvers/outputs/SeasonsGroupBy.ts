import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SeasonsAvgAggregate } from "../outputs/SeasonsAvgAggregate";
import { SeasonsCountAggregate } from "../outputs/SeasonsCountAggregate";
import { SeasonsMaxAggregate } from "../outputs/SeasonsMaxAggregate";
import { SeasonsMinAggregate } from "../outputs/SeasonsMinAggregate";
import { SeasonsSumAggregate } from "../outputs/SeasonsSumAggregate";

@TypeGraphQL.ObjectType("SeasonsGroupBy", {
  isAbstract: true
})
export class SeasonsGroupBy {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  startdate!: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  enddate!: Date | null;

  @TypeGraphQL.Field(_type => SeasonsCountAggregate, {
    nullable: true
  })
  _count!: SeasonsCountAggregate | null;

  @TypeGraphQL.Field(_type => SeasonsAvgAggregate, {
    nullable: true
  })
  _avg!: SeasonsAvgAggregate | null;

  @TypeGraphQL.Field(_type => SeasonsSumAggregate, {
    nullable: true
  })
  _sum!: SeasonsSumAggregate | null;

  @TypeGraphQL.Field(_type => SeasonsMinAggregate, {
    nullable: true
  })
  _min!: SeasonsMinAggregate | null;

  @TypeGraphQL.Field(_type => SeasonsMaxAggregate, {
    nullable: true
  })
  _max!: SeasonsMaxAggregate | null;
}
