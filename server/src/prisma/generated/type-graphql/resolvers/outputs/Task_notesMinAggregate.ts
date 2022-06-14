import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import {Prisma} from '@prisma/client';
import {DecimalJSScalar} from '../../scalars';

@TypeGraphQL.ObjectType('Task_notesMinAggregate', {
  isAbstract: true,
})
export class Task_notesMinAggregate {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    id!: number | null;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
    task_id!: number | null;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
    notes!: string | null;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
    date_created!: Date | null;
}
