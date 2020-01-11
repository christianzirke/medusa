import passport from 'passport';

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  return cb(null, { id: 1, email: 1, password: 1 });
});
