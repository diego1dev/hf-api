import { onRouteHookHandler } from 'fastify';
import { PrettyLogger } from 'modules/common/infrastructure/logger';

export const onRoute:onRouteHookHandler = (r) => {
  if (r.method !== 'HEAD') {
    PrettyLogger.info(`${r.method} ${r.url}`);
  }
};
export default onRoute;
