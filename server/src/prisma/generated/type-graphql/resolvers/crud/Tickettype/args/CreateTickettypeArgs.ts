import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {TickettypeCreateInput} from '../../../inputs/TickettypeCreateInput';

@TypeGraphQL.ArgsType()
export class CreateTickettypeArgs {
  @TypeGraphQL.Field((_type) => TickettypeCreateInput, {
    nullable: false,
  })
    data!: TickettypeCreateInput;
}
