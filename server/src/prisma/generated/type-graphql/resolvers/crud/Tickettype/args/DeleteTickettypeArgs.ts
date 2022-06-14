import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {TickettypeWhereUniqueInput} from '../../../inputs/TickettypeWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class DeleteTickettypeArgs {
  @TypeGraphQL.Field((_type) => TickettypeWhereUniqueInput, {
    nullable: false,
  })
    where!: TickettypeWhereUniqueInput;
}
