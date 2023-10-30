import { Body, Controller, Post } from '@nestjs/common';
import { LoggerService } from '../../application/logger.service';
import { Log } from 'src/logger/domain/Log';

@Controller('logger')
export class LoggerController {
  constructor(private loggerService: LoggerService) {}

  @Post()
  createLog(@Body('message') message: string): Log {
    return this.loggerService.create(message);
  }
}
