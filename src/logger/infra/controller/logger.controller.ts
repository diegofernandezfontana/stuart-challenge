import { Body, Controller, Post } from '@nestjs/common';
import { LoggerService } from '../../application/logger.service';

@Controller('logger')
export class LoggerController {
  constructor(private loggerService: LoggerService) {}

  @Post()
  createLog(@Body('message') message: string) {
    console.log('endpoint working!');
    return;
  }
}
