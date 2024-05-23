import { LoggerOptions } from 'pino';

export const loggerOptions:LoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: 'hostname,pid',
    },
  },
};

export default loggerOptions;
