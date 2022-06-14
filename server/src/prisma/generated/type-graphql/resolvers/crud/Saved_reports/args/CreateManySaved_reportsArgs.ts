import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Saved_reportsCreateManyInput} from '../../../inputs/Saved_reportsCreateManyInput';

@TypeGraphQL.ArgsType()
export class CreateManySaved_reportsArgs {
  @TypeGraphQL.Field((_type) => [Saved_reportsCreateManyInput], {
    nullable: false,
  })
    data!: Saved_reportsCreateManyInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
