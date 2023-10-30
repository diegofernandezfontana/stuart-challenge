import { Query, Resolver } from '@nestjs/graphql';
import { LogModel } from './log.model';
import { LoggerService } from '../../application/logger.service';

@Resolver()
export class LoggerResolver {
  constructor(private loggingService: LoggerService) {}

  @Query(() => String)
  logs(): LogModel {
    return { id: 123, timestamp: '1', message: 'asd' };
  }
}
