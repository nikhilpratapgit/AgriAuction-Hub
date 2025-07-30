import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { User } from '../models/User.models.js';

dotenv.config();
// ✅ Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/callback', // ✅ must match Google Console
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const username = profile.displayName || profile.name?.givenName || 'GoogleUser';
        const photo = profile.photos?.[0]?.value || '';

        if (!email) {
          return done(new Error('Google account has no email.'), null);
        }

        // Check if user with googleId exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Check if email already exists from manual signup
          const existingEmailUser = await User.findOne({ email });

          if (existingEmailUser) {
            existingEmailUser.googleId = profile.id;
            existingEmailUser.isVerified = true;
            if (photo) existingEmailUser.photo = photo;
            await existingEmailUser.save({ validateBeforeSave: false });
            return done(null, existingEmailUser);
          }

          // Create new user
          user = await User.create({
            username,
            email,
            googleId: profile.id,
            isVerified: true,
            role: 'buyer', // default role
            photo,
          });
        }

        return done(null, user);
      } catch (err) {
        console.error('GoogleStrategy Error:', err);
        return done(err, null);
      }
    }
  )
);

// ✅ Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ✅ Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password');
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
