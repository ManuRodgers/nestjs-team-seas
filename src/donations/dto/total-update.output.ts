import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TotalUpdate {
  @Field(() => Int, { nullable: false })
  total!: number;
}
