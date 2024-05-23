import { Strategy as LocalStrategy } from 'passport-local';
import { PassportStatic } from 'passport';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES as USER_TYPESDEPENDENCIES } from 'modules/users/dependencies/TypesDependencies';
import { TYPESDEPENDENCIES as AUTH_TYPESDEPENDENCIES } from 'modules/auth/dependencies/TypesDependencies';
import UserService from 'modules/auth/domain/services/AuthService';
import { UserDAO } from 'modules/users/infrastructure/db/dao';

export const initLocalStrategy = (passport: PassportStatic): void => {
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const repository = GLOBAL_CONTAINER.get<UserDAO>(USER_TYPESDEPENDENCIES.DBRepository);
          const authService = GLOBAL_CONTAINER.get<UserService>(AUTH_TYPESDEPENDENCIES.Service);

          const user = await repository.getByEmail(email);
          if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          const isValidPass = await authService.isValidPassword(password, user.password);
          if (!isValidPass) {
            return done(null, false, { message: 'Invalid email or password' });
          }

          return done(null, user, { message: 'Success login' });
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};

export default initLocalStrategy;
