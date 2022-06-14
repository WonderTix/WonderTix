import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DonationsOrderByWithRelationInput} from '../../../inputs/DonationsOrderByWithRelationInput';
import {DonationsWhereInput} from '../../../inputs/DonationsWhereInput';
import {DonationsWhereUniqueInput} from '../../../inputs/DonationsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class AggregateDonationsArgs {
  @TypeGraphQL.Field((_type) => DonationsWhereInput, {
    nullable: true,
  })
    where?: DonationsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [DonationsOrderByWithRelationInput], {
    nullable: true,
  })
    orderBy?: DonationsOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => DonationsWhereUniqueInput, {
    nullable: true,
  })
    cursor?: DonationsWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    skip?: number | undefined;
}
