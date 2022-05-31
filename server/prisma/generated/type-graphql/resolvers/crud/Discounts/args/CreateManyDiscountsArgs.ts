import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DiscountsCreateManyInput } from "../../../inputs/DiscountsCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyDiscountsArgs {
  @TypeGraphQL.Field(_type => [DiscountsCreateManyInput], {
    nullable: false
  })
  data!: DiscountsCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
