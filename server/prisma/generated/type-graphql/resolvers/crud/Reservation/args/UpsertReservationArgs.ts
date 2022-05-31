import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReservationCreateInput } from "../../../inputs/ReservationCreateInput";
import { ReservationUpdateInput } from "../../../inputs/ReservationUpdateInput";
import { ReservationWhereUniqueInput } from "../../../inputs/ReservationWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertReservationArgs {
  @TypeGraphQL.Field(_type => ReservationWhereUniqueInput, {
    nullable: false
  })
  where!: ReservationWhereUniqueInput;

  @TypeGraphQL.Field(_type => ReservationCreateInput, {
    nullable: false
  })
  create!: ReservationCreateInput;

  @TypeGraphQL.Field(_type => ReservationUpdateInput, {
    nullable: false
  })
  update!: ReservationUpdateInput;
}
