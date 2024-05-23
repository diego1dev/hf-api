import pino from 'pino';
import { loggerOptions } from './config';

export const PrettyLogger = pino(loggerOptions);
export default PrettyLogger;
