import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {TicketsWhereInput} from '../../../inputs/TicketsWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManyTicketsArgs {
  @TypeGraphQL.Field((_type) => TicketsWhereInput, {
    nullable: true,
  })
    where?: TicketsWhereInput | undefined;
}
