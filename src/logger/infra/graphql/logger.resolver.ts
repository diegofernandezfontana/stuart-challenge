import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LogModel } from './log.model';
import { LoggerService } from '../../application/logger.service';
import { Log } from 'src/logger/domain/Log';

@Resolver()
export class LoggerResolver {
  constructor(private logService: LoggerService) {}

  @Query(() => String)
  getDummy(): LogModel {
    const dummyLog = Log.create('this is a dummy message');

    return {
      id: dummyLog.id,
      timestamp: dummyLog.timestamp,
      message: dummyLog.message,
    };
  }

  @Mutation(() => Boolean)
  async createLog(@Args('message') message: string) {
    this.logService.create(message);
    return true;
  }
}
