import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Event_instancesOrderByWithAggregationInput} from '../../../inputs/Event_instancesOrderByWithAggregationInput';
import {Event_instancesScalarWhereWithAggregatesInput} from '../../../inputs/Event_instancesScalarWhereWithAggregatesInput';
import {Event_instancesWhereInput} from '../../../inputs/Event_instancesWhereInput';
import {Event_instancesScalarFieldEnum} from '../../../../enums/Event_instancesScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class GroupByEvent_instancesArgs {
  @TypeGraphQL.Field((_type) => Event_instancesWhereInput, {
    nullable: true,
  })
    where?: Event_instancesWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesOrderByWithAggregationInput], {
    nullable: true,
  })
    orderBy?: Event_instancesOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field((_type) => [Event_instancesScalarFieldEnum], {
    nullable: false,
  })
    by!: Array<'id' | 'eventid' | 'eventdate' | 'starttime' | 'salestatus' | 'totalseats' | 'availableseats' | 'purchaseuri'>;

  @TypeGraphQL.Field((_type) => Event_instancesScalarWhereWithAggregatesInput, {
    nullable: true,
  })
    having?: Event_instancesScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    skip?: number | undefined;
}
