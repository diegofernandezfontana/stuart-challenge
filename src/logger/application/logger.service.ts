import { Injectable } from '@nestjs/common';
import { Log } from '../infra/graphql/log.model';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService {
  private logs: Log[] = [];

  create(message: string): Log {
    //todo create domain object + VO
    const log: Log = {
      id: this.logs.length + 1,
      message,
      timestamp: new Date().toISOString(),
    };

    this.logs.push(log);
    fs.appendFileSync(
      path.resolve(__dirname, 'logs.txt'),
      JSON.stringify(log) + '\n',
    );
    return log;
  }
}
