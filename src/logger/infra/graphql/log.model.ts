import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Log {
  @Field(() => Int)
  id: number;

  @Field()
  message: string;

  @Field()
  timestamp: string;
}
