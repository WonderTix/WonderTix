import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Saved_reportsUpdateManyMutationInput } from "../../../inputs/Saved_reportsUpdateManyMutationInput";
import { Saved_reportsWhereInput } from "../../../inputs/Saved_reportsWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManySaved_reportsArgs {
  @TypeGraphQL.Field(_type => Saved_reportsUpdateManyMutationInput, {
    nullable: false
  })
  data!: Saved_reportsUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => Saved_reportsWhereInput, {
    nullable: true
  })
  where?: Saved_reportsWhereInput | undefined;
}
