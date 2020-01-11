import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';

import './init';
import User from '../data/models/user';

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    const user = await User.scope("withPassword").findOne({ where: { email } });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const jsonUser = user.toJSON();
        delete jsonUser.password;
        
        return done(null, jsonUser);
      }
    }
    
    return done(null, false);
  },
));

module.exports = passport;