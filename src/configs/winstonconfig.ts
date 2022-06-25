import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

const config: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `[${info.timestamp}] ${info.level.toUpperCase()} ${
              info.context
                ? info.context +
                  ' '.repeat(
                    15 - info.context.length > 0 ? 15 - info.context.length : 0,
                  )
                : ''
            } ${info.message} ${
              info.stack ? '\n[STACKTRACE] ' + info.stack : ''
            }`,
        ),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `[${info.timestamp}] ${info.level.toUpperCase()} ${
              info.context
                ? info.context +
                  ' '.repeat(
                    15 - info.context.length > 0 ? 15 - info.context.length : 0,
                  )
                : ''
            } ${info.message} ${
              info.stack ? '\n[STACKTRACE] ' + info.stack : ''
            }`,
        ),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `[${info.timestamp}] ${info.level.toUpperCase()} ${
              info.context
                ? info.context +
                  ' '.repeat(
                    15 - info.context.length > 0 ? 15 - info.context.length : 0,
                  )
                : ''
            } ${info.message} ${
              info.stack ? '\n[STACKTRACE] ' + info.stack : ''
            }`,
        ),
      ),
    }),
  ],
};

export = config;
