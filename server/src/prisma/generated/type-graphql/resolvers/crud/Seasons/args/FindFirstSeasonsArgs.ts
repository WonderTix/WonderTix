import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {SeasonsOrderByWithRelationInput} from '../../../inputs/SeasonsOrderByWithRelationInput';
import {SeasonsWhereInput} from '../../../inputs/SeasonsWhereInput';
import {SeasonsWhereUniqueInput} from '../../../inputs/SeasonsWhereUniqueInput';
import {SeasonsScalarFieldEnum} from '../../../../enums/SeasonsScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class FindFirstSeasonsArgs {
  @TypeGraphQL.Field((_type) => SeasonsWhereInput, {
    nullable: true,
  })
    where?: SeasonsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [SeasonsOrderByWithRelationInput], {
    nullable: true,
  })
    orderBy?: SeasonsOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => SeasonsWhereUniqueInput, {
    nullable: true,
  })
    cursor?: SeasonsWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [SeasonsScalarFieldEnum], {
    nullable: true,
  })
    distinct?: Array<'id' | 'name' | 'startdate' | 'enddate'> | undefined;
}
