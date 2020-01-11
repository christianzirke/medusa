import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';

import './init';

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
  },
  (email, password, done) => {
    if (email === 'contact@medusa.com' && password === 'm3Du5@') {
      return done(null, { email, password, id: 1 });
    }
    
    return done(null, false);
  },
));

module.exports = passport;