import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {TickettypeCreateManyInput} from '../../../inputs/TickettypeCreateManyInput';

@TypeGraphQL.ArgsType()
export class CreateManyTickettypeArgs {
  @TypeGraphQL.Field((_type) => [TickettypeCreateManyInput], {
    nullable: false,
  })
    data!: TickettypeCreateManyInput[];

  @TypeGraphQL.Field((_type) => Boolean, {
    nullable: true,
  })
    skipDuplicates?: boolean | undefined;
}
