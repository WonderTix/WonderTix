import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {DiscountsAvgAggregate} from '../outputs/DiscountsAvgAggregate';
import {DiscountsCountAggregate} from '../outputs/DiscountsCountAggregate';
import {DiscountsMaxAggregate} from '../outputs/DiscountsMaxAggregate';
import {DiscountsMinAggregate} from '../outputs/DiscountsMinAggregate';
import {DiscountsSumAggregate} from '../outputs/DiscountsSumAggregate';

@TypeGraphQL.ObjectType('DiscountsGroupBy', {
  isAbstract: true,
})
export class DiscountsGroupBy {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
    id!: number;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    code!: string | null;

  @TypeGraphQL.Field((_type) => DecimalJSScalar, {
    nullable: true,
  })
    amount!: Prisma.Decimal | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    enddate!: Date | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    startdate!: Date | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    usagelimit!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    min_tickets!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    min_events!: number | null;

  @TypeGraphQL.Field((_type) => DiscountsCountAggregate, {
    nullable: true,
  })
    _count!: DiscountsCountAggregate | null;

  @TypeGraphQL.Field((_type) => DiscountsAvgAggregate, {
    nullable: true,
  })
    _avg!: DiscountsAvgAggregate | null;

  @TypeGraphQL.Field((_type) => DiscountsSumAggregate, {
    nullable: true,
  })
    _sum!: DiscountsSumAggregate | null;

  @TypeGraphQL.Field((_type) => DiscountsMinAggregate, {
    nullable: true,
  })
    _min!: DiscountsMinAggregate | null;

  @TypeGraphQL.Field((_type) => DiscountsMaxAggregate, {
    nullable: true,
  })
    _max!: DiscountsMaxAggregate | null;
}
