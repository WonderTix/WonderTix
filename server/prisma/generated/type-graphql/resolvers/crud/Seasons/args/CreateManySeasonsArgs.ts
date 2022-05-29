import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { SeasonsCreateManyInput } from "../../../inputs/SeasonsCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManySeasonsArgs {
  @TypeGraphQL.Field(_type => [SeasonsCreateManyInput], {
    nullable: false
  })
  data!: SeasonsCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
