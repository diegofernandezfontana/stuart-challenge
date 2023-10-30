import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogModel {
  @Field()
  id: string;

  @Field()
  message: string;

  @Field()
  timestamp: string;
}
