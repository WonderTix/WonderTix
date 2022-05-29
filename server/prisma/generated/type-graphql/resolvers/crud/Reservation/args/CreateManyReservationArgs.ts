import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ReservationCreateManyInput } from "../../../inputs/ReservationCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyReservationArgs {
  @TypeGraphQL.Field(_type => [ReservationCreateManyInput], {
    nullable: false
  })
  data!: ReservationCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
