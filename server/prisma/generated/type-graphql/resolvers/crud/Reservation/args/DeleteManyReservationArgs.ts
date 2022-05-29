import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReservationWhereInput } from "../../../inputs/ReservationWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyReservationArgs {
  @TypeGraphQL.Field(_type => ReservationWhereInput, {
    nullable: true
  })
  where?: ReservationWhereInput | undefined;
}
