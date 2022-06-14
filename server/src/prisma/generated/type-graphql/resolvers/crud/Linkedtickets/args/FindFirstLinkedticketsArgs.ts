import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {LinkedticketsOrderByWithRelationInput} from '../../../inputs/LinkedticketsOrderByWithRelationInput';
import {LinkedticketsWhereInput} from '../../../inputs/LinkedticketsWhereInput';
import {LinkedticketsWhereUniqueInput} from '../../../inputs/LinkedticketsWhereUniqueInput';
import {LinkedticketsScalarFieldEnum} from '../../../../enums/LinkedticketsScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class FindFirstLinkedticketsArgs {
  @TypeGraphQL.Field((_type) => LinkedticketsWhereInput, {
    nullable: true,
  })
    where?: LinkedticketsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [LinkedticketsOrderByWithRelationInput], {
    nullable: true,
  })
    orderBy?: LinkedticketsOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => LinkedticketsWhereUniqueInput, {
    nullable: true,
  })
    cursor?: LinkedticketsWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [LinkedticketsScalarFieldEnum], {
    nullable: true,
  })
    distinct?: Array<'id' | 'event_instance_id' | 'ticket_type' | 'dummy'> | undefined;
}
