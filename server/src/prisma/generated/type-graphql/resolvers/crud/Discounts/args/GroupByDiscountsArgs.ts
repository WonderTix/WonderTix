import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DiscountsOrderByWithAggregationInput} from '../../../inputs/DiscountsOrderByWithAggregationInput';
import {DiscountsScalarWhereWithAggregatesInput} from '../../../inputs/DiscountsScalarWhereWithAggregatesInput';
import {DiscountsWhereInput} from '../../../inputs/DiscountsWhereInput';
import {DiscountsScalarFieldEnum} from '../../../../enums/DiscountsScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class GroupByDiscountsArgs {
  @TypeGraphQL.Field((_type) => DiscountsWhereInput, {
    nullable: true,
  })
    where?: DiscountsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [DiscountsOrderByWithAggregationInput], {
    nullable: true,
  })
    orderBy?: DiscountsOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [DiscountsScalarFieldEnum], {
    nullable: false,
  })
    by!: Array<'id' | 'code' | 'amount' | 'enddate' | 'startdate' | 'usagelimit' | 'min_tickets' | 'min_events'>;

  @TypeGraphQL.Field((_type) => DiscountsScalarWhereWithAggregatesInput, {
    nullable: true,
  })
    having?: DiscountsScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    skip?: number | undefined;
}
