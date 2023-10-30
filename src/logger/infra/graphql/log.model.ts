import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogModel {
  @Field(() => Int)
  id: number;

  @Field()
  message: string;

  @Field()
  timestamp: string;
}
