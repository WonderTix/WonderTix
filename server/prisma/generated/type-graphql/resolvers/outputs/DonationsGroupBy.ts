import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DonationsAvgAggregate } from "../outputs/DonationsAvgAggregate";
import { DonationsCountAggregate } from "../outputs/DonationsCountAggregate";
import { DonationsMaxAggregate } from "../outputs/DonationsMaxAggregate";
import { DonationsMinAggregate } from "../outputs/DonationsMinAggregate";
import { DonationsSumAggregate } from "../outputs/DonationsSumAggregate";
import { freq } from "../../enums/freq";

@TypeGraphQL.ObjectType("DonationsGroupBy", {
  isAbstract: true
})
export class DonationsGroupBy {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  donorid!: number | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isanonymous!: boolean | null;

  @TypeGraphQL.Field(_type => DecimalJSScalar, {
    nullable: true
  })
  amount!: Prisma.Decimal | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  dononame!: string | null;

  @TypeGraphQL.Field(_type => freq, {
    nullable: true
  })
  frequency!: "one_time" | "weekly" | "monthly" | "yearly" | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  comments!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  donodate!: Date | null;

  @TypeGraphQL.Field(_type => DonationsCountAggregate, {
    nullable: true
  })
  _count!: DonationsCountAggregate | null;

  @TypeGraphQL.Field(_type => DonationsAvgAggregate, {
    nullable: true
  })
  _avg!: DonationsAvgAggregate | null;

  @TypeGraphQL.Field(_type => DonationsSumAggregate, {
    nullable: true
  })
  _sum!: DonationsSumAggregate | null;

  @TypeGraphQL.Field(_type => DonationsMinAggregate, {
    nullable: true
  })
  _min!: DonationsMinAggregate | null;

  @TypeGraphQL.Field(_type => DonationsMaxAggregate, {
    nullable: true
  })
  _max!: DonationsMaxAggregate | null;
}
