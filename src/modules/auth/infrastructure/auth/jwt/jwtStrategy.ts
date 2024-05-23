import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IJWT } from 'modules/auth/domain/entities/IJWT';
import { ENV } from 'modules/common/utils/env';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES } from 'modules/users/dependencies/TypesDependencies';
import { PassportStatic } from 'passport';
import { UserDAO } from 'modules/users/infrastructure/db/dao';

// TODO AGREGAR FORMA DE RENOVACION DE TOKEN POR ACTIVIDAD

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ENV.JWT_SECRET,
};

export const initJwtStrategy = (passport: PassportStatic): void => {
  passport.use('jwt', new JwtStrategy(jwtOptions, async (payload:IJWT, done) => {
    try {
      const userDAO = GLOBAL_CONTAINER.get<UserDAO>(TYPESDEPENDENCIES.DBRepository);
      const user = await userDAO.getByIdComplete(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }));
};

export default initJwtStrategy;
