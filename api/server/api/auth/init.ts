import passport from 'passport';
import User from '../data/models/user';

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findOne({ where: { id } }).then((user) => {
    if (user) {
      return cb(null, user);
    }
    
    return cb(null, false);
  });
  
});
