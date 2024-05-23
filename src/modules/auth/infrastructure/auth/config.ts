import passport from 'passport';
import { initLocalStrategy } from './passport/localStrategy';
import { initJwtStrategy } from './jwt/jwtStrategy';

initLocalStrategy(passport);
initJwtStrategy(passport);

export const isAuthenticate = passport.authenticate('jwt', { session: false });
export const authenticateLocal = passport.authenticate('local', { session: false });

export default passport;
