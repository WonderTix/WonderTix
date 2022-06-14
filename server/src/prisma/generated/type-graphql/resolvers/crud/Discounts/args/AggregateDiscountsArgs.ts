import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {DiscountsOrderByWithRelationInput} from '../../../inputs/DiscountsOrderByWithRelationInput';
import {DiscountsWhereInput} from '../../../inputs/DiscountsWhereInput';
import {DiscountsWhereUniqueInput} from '../../../inputs/DiscountsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class AggregateDiscountsArgs {
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
}
