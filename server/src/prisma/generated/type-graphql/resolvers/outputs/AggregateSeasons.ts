import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';
import {SeasonsAvgAggregate} from '../outputs/SeasonsAvgAggregate';
import {SeasonsCountAggregate} from '../outputs/SeasonsCountAggregate';
import {SeasonsMaxAggregate} from '../outputs/SeasonsMaxAggregate';
import {SeasonsMinAggregate} from '../outputs/SeasonsMinAggregate';
import {SeasonsSumAggregate} from '../outputs/SeasonsSumAggregate';

@TypeGraphQL.ObjectType('AggregateSeasons', {
  isAbstract: true,
})
export class AggregateSeasons {
  @TypeGraphQL.Field((_type) => SeasonsCountAggregate, {
    nullable: true,
  })
    _count!: SeasonsCountAggregate | null;

  @TypeGraphQL.Field((_type) => SeasonsAvgAggregate, {
    nullable: true,
  })
    _avg!: SeasonsAvgAggregate | null;

  @TypeGraphQL.Field((_type) => SeasonsSumAggregate, {
    nullable: true,
  })
    _sum!: SeasonsSumAggregate | null;

  @TypeGraphQL.Field((_type) => SeasonsMinAggregate, {
    nullable: true,
  })
    _min!: SeasonsMinAggregate | null;

  @TypeGraphQL.Field((_type) => SeasonsMaxAggregate, {
    nullable: true,
  })
    _max!: SeasonsMaxAggregate | null;
}
