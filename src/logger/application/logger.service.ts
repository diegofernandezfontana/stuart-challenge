import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Log } from '../domain/Log';

@Injectable()
export class LoggerService {
  private filePath = path.resolve(__dirname, 'logs.txt');

  create(message: string): Log {
    const log = Log.create(message);

    fs.appendFileSync(this.filePath, log.stringify() + '\n');

    return log;
  }
}
