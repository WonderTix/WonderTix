import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {LinkedticketsCreateManyInput} from '../../../inputs/LinkedticketsCreateManyInput';

@TypeGraphQL.ArgsType()
export class CreateManyLinkedticketsArgs {
  @TypeGraphQL.Field((_type) => [LinkedticketsCreateManyInput], {
    nullable: false,
  })
    data!: LinkedticketsCreateManyInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
