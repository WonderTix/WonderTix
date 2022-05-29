import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Event_instancesOrderByWithRelationInput } from "../../../inputs/Event_instancesOrderByWithRelationInput";
import { Event_instancesWhereInput } from "../../../inputs/Event_instancesWhereInput";
import { Event_instancesWhereUniqueInput } from "../../../inputs/Event_instancesWhereUniqueInput";
import { Event_instancesScalarFieldEnum } from "../../../../enums/Event_instancesScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyEvent_instancesArgs {
  @TypeGraphQL.Field(_type => Event_instancesWhereInput, {
    nullable: true
  })
  where?: Event_instancesWhereInput | undefined;

  @TypeGraphQL.Field(_type => [Event_instancesOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: Event_instancesOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => Event_instancesWhereUniqueInput, {
    nullable: true
  })
  cursor?: Event_instancesWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [Event_instancesScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"id" | "eventid" | "eventdate" | "starttime" | "salestatus" | "totalseats" | "availableseats" | "purchaseuri"> | undefined;
}
