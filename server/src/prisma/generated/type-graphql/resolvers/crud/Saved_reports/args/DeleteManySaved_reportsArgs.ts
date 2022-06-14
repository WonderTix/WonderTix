import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Saved_reportsWhereInput} from '../../../inputs/Saved_reportsWhereInput';

@TypeGraphQL.ArgsType()
export class DeleteManySaved_reportsArgs {
  @TypeGraphQL.Field((_type) => Saved_reportsWhereInput, {
    nullable: true,
  })
    where?: Saved_reportsWhereInput | undefined;
}
