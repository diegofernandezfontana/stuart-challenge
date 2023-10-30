import { Module } from '@nestjs/common';
import { LoggerService } from './application/logger.service';
import { LoggerController } from './infra/controller/logger.controller';
import { LoggerResolver } from './infra/graphql/logger.resolver';

@Module({
  providers: [LoggerService, LoggerResolver],
  controllers: [LoggerController],
  exports: [LoggerResolver],
})
export class LoggerModule {}
