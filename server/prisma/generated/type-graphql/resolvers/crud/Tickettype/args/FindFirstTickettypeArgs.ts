import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TickettypeOrderByWithRelationInput } from "../../../inputs/TickettypeOrderByWithRelationInput";
import { TickettypeWhereInput } from "../../../inputs/TickettypeWhereInput";
import { TickettypeWhereUniqueInput } from "../../../inputs/TickettypeWhereUniqueInput";
import { TickettypeScalarFieldEnum } from "../../../../enums/TickettypeScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstTickettypeArgs {
  @TypeGraphQL.Field(_type => TickettypeWhereInput, {
    nullable: true
  })
  where?: TickettypeWhereInput | undefined;

  @TypeGraphQL.Field(_type => [TickettypeOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: TickettypeOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => TickettypeWhereUniqueInput, {
    nullable: true
  })
  cursor?: TickettypeWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [TickettypeScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "name" | "isseason" | "seasonid" | "price" | "concessions"> | undefined;
}
