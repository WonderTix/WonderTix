import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Saved_reportsCreateInput} from '../../../inputs/Saved_reportsCreateInput';
import {Saved_reportsUpdateInput} from '../../../inputs/Saved_reportsUpdateInput';
import {Saved_reportsWhereUniqueInput} from '../../../inputs/Saved_reportsWhereUniqueInput';

@TypeGraphQL.ArgsType()
export class UpsertSaved_reportsArgs {
  @TypeGraphQL.Field((_type) => Saved_reportsWhereUniqueInput, {
    nullable: false,
  })
    where!: Saved_reportsWhereUniqueInput;

  @TypeGraphQL.Field((_type) => Saved_reportsCreateInput, {
    nullable: false,
  })
    create!: Saved_reportsCreateInput;

  @TypeGraphQL.Field((_type) => Saved_reportsUpdateInput, {
    nullable: false,
  })
    update!: Saved_reportsUpdateInput;
}
