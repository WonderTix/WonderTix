import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {TicketsCreateInput} from '../../../inputs/TicketsCreateInput';
import {TicketsUpdateInput} from '../../../inputs/TicketsUpdateInput';
import {TicketsWhereUniqueInput} from '../../../inputs/TicketsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertTicketsArgs {
  @TypeGraphQL.Field((_type) => TicketsWhereUniqueInput, {
    nullable: false,
  })
    where!: TicketsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => TicketsCreateInput, {
    nullable: false,
  })
    create!: TicketsCreateInput;

  @TypeGraphQL.Field((_type) => TicketsUpdateInput, {
    nullable: false,
  })
    update!: TicketsUpdateInput;
}
