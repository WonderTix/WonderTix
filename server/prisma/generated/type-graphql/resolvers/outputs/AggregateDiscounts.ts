import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DiscountsAvgAggregate } from "../outputs/DiscountsAvgAggregate";
import { DiscountsCountAggregate } from "../outputs/DiscountsCountAggregate";
import { DiscountsMaxAggregate } from "../outputs/DiscountsMaxAggregate";
import { DiscountsMinAggregate } from "../outputs/DiscountsMinAggregate";
import { DiscountsSumAggregate } from "../outputs/DiscountsSumAggregate";

@TypeGraphQL.ObjectType("AggregateDiscounts", {
  isAbstract: true
})
export class AggregateDiscounts {
  @TypeGraphQL.Field(_type => DiscountsCountAggregate, {
    nullable: true
  })
  _count!: DiscountsCountAggregate | null;

  @TypeGraphQL.Field(_type => DiscountsAvgAggregate, {
    nullable: true
  })
  _avg!: DiscountsAvgAggregate | null;

  @TypeGraphQL.Field(_type => DiscountsSumAggregate, {
    nullable: true
  })
  _sum!: DiscountsSumAggregate | null;

  @TypeGraphQL.Field(_type => DiscountsMinAggregate, {
    nullable: true
  })
  _min!: DiscountsMinAggregate | null;

  @TypeGraphQL.Field(_type => DiscountsMaxAggregate, {
    nullable: true
  })
  _max!: DiscountsMaxAggregate | null;
}
