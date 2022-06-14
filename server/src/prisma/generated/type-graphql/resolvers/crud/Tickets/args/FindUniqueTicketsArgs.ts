import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {TicketsWhereUniqueInput} from '../../../inputs/TicketsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class FindUniqueTicketsArgs {
  @TypeGraphQL.Field((_type) => TicketsWhereUniqueInput, {
    nullable: false,
  })
    where!: TicketsWhereUniqueInput;
}
