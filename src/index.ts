import 'reflect-metadata';
import dotenv from 'dotenv';
import ServerFactory from 'modules/common/infrastructure/app/serverFactory';
import { TYPESSERVER } from 'modules/common/interfaces';
import { ENV } from 'modules/common/utils/env';
import { AuthRouter } from 'modules/auth/routers';
import { syncModels } from 'modules/common/infrastructure/db';
import { UserRouter } from 'modules/users/routers';
import { RoleRouter } from 'modules/roles/routers';
import { FeatureRouter } from 'modules/features/routers';

dotenv.config();

async function app() {
  syncModels();
  const modulesFactory = new ServerFactory();
  const server = modulesFactory.createHttpServer(TYPESSERVER.FASTIFY);
  modulesFactory.initModules(
    [
      FeatureRouter,
      RoleRouter,
      UserRouter,
      AuthRouter,
    ],
  );
  server.start(+ENV.PORT);
}
app();
