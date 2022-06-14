import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DiscountsOrderByWithRelationInput} from '../../../inputs/DiscountsOrderByWithRelationInput';
import {DiscountsWhereInput} from '../../../inputs/DiscountsWhereInput';
import {DiscountsWhereUniqueInput} from '../../../inputs/DiscountsWhereUniqueInput';
import {DiscountsScalarFieldEnum} from '../../../../enums/DiscountsScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class FindManyDiscountsArgs {
  @TypeGraphQL.Field((_type) => DiscountsWhereInput, {
    nullable: true,
  })
    where?: DiscountsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [DiscountsOrderByWithRelationInput], {
    nullable: true,
  })
    orderBy?: DiscountsOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => DiscountsWhereUniqueInput, {
    nullable: true,
  })
    cursor?: DiscountsWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [DiscountsScalarFieldEnum], {
    nullable: true,
  })
    distinct?: Array<'id' | 'code' | 'amount' | 'enddate' | 'startdate' | 'usagelimit' | 'min_tickets' | 'min_events'> | undefined;
}
