import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {SeasonsOrderByWithAggregationInput} from '../../../inputs/SeasonsOrderByWithAggregationInput';
import {SeasonsScalarWhereWithAggregatesInput} from '../../../inputs/SeasonsScalarWhereWithAggregatesInput';
import {SeasonsWhereInput} from '../../../inputs/SeasonsWhereInput';
import {SeasonsScalarFieldEnum} from '../../../../enums/SeasonsScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class GroupBySeasonsArgs {
  @TypeGraphQL.Field((_type) => SeasonsWhereInput, {
    nullable: true,
  })
    where?: SeasonsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [SeasonsOrderByWithAggregationInput], {
    nullable: true,
  })
    orderBy?: SeasonsOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [SeasonsScalarFieldEnum], {
    nullable: false,
  })
    by!: Array<'id' | 'name' | 'startdate' | 'enddate'>;

  @TypeGraphQL.Field((_type) => SeasonsScalarWhereWithAggregatesInput, {
    nullable: true,
  })
    having?: SeasonsScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    skip?: number | undefined;
}
