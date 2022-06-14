import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {TicketsOrderByWithRelationInput} from '../../../inputs/TicketsOrderByWithRelationInput';
import {TicketsWhereInput} from '../../../inputs/TicketsWhereInput';
import {TicketsWhereUniqueInput} from '../../../inputs/TicketsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class AggregateTicketsArgs {
  @TypeGraphQL.Field((_type) => TicketsWhereInput, {
    nullable: true,
  })
    where?: TicketsWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [TicketsOrderByWithRelationInput], {
    nullable: true,
  })
    orderBy?: TicketsOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => TicketsWhereUniqueInput, {
    nullable: true,
  })
    cursor?: TicketsWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    skip?: number | undefined;
}
