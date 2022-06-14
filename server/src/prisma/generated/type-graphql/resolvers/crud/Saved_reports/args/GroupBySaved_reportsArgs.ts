import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Saved_reportsOrderByWithAggregationInput} from '../../../inputs/Saved_reportsOrderByWithAggregationInput';
import {Saved_reportsScalarWhereWithAggregatesInput} from '../../../inputs/Saved_reportsScalarWhereWithAggregatesInput';
import {Saved_reportsWhereInput} from '../../../inputs/Saved_reportsWhereInput';
import {Saved_reportsScalarFieldEnum} from '../../../../enums/Saved_reportsScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class GroupBySaved_reportsArgs {
  @TypeGraphQL.Field((_type) => Saved_reportsWhereInput, {
    nullable: true,
  })
    where?: Saved_reportsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [Saved_reportsOrderByWithAggregationInput], {
    nullable: true,
  })
    orderBy?: Saved_reportsOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Saved_reportsScalarFieldEnum], {
    nullable: false,
  })
    by!: Array<'id' | 'table_name' | 'query_attr'>;

  @TypeGraphQL.Field((_type) => Saved_reportsScalarWhereWithAggregatesInput, {
    nullable: true,
  })
    having?: Saved_reportsScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    skip?: number | undefined;
}
