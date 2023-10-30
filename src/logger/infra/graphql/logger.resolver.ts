import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Log } from './log.model';
import { LoggerService } from '../../application/logger.service';

@Resolver()
export class LoggerResolver {
  constructor(private loggingService: LoggerService) {}

  @Query(() => String)
  logs(): Log {
    return { id: 123, timestamp: '1', message: 'asd' };
  }
}
