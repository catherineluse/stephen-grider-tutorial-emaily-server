const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

passport.use(new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {

          if (existingUser){
            return done(null, existingUser);

          } else {
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
        })
    }
 )
);

/*
accessToken ya29.Glz6BSis7M8zcgKKylrSB8BGYn4_aSL4uVmfuH51NatUaVsp-pZ4BeS3Jb-iJxdU001U3udGV6SOOzPAZj0MvHeHr3OVl32zZl8ZGnV_gLVu0vDRvHROpLnOBF9Oug
refresh token undefined
profile: { id: '116343868440478799138',
  displayName: 'Catherine Luse',
  name: { familyName: 'Luse', givenName: 'Catherine' },
  emails: [ { value: 'catherine.luse@gmail.com', type: 'account' } ],
  photos:
   [ { value: 'https://lh3.googleusercontent.com/-TC5BBKwy1dQ/AAAAAAAAAAI/AAAAAAAAHd8/4872onxylMI/photo.jpg?sz=50' } ],
  gender: 'female',
  provider: 'google',
  _raw: '{\n "kind": "plus#person",\n "etag": "\\"hCnRu-GwRzXLXPdAHHyDrK_S150/u1y7_ACsKuNsLP92u8eFR3CvZNQ\\"",\n "gender": "female",\n "emails": [\n  {\n   "value": "catherine.luse@gmail.com",\n   "type": "account"\n  }\n ],\n "objectType": "person",\n "id": "116343868440478799138",\n "displayName": "Catherine Luse",\n "name": {\n  "familyName": "Luse",\n  "givenName": "Catherine"\n },\n "url": "https://plus.google.com/116343868440478799138",\n "image": {\n  "url": "https://lh3.googleusercontent.com/-TC5BBKwy1dQ/AAAAAAAAAAI/AAAAAAAAHd8/4872onxylMI/photo.jpg?sz=50",\n  "isDefault": false\n },\n "isPlusUser": true,\n "language": "en",\n "circledByCount": 7,\n "verified": false\n}\n',
  _json:
   { kind: 'plus#person',
     etag: '"hCnRu-GwRzXLXPdAHHyDrK_S150/u1y7_ACsKuNsLP92u8eFR3CvZNQ"',
     gender: 'female',
     emails: [ [Object] ],
     objectType: 'person',
     id: '116343868440478799138',
     displayName: 'Catherine Luse',
     name: { familyName: 'Luse', givenName: 'Catherine' },
     url: 'https://plus.google.com/116343868440478799138',
     image:
      { url: 'https://lh3.googleusercontent.com/-TC5BBKwy1dQ/AAAAAAAAAAI/AAAAAAAAHd8/4872onxylMI/photo.jpg?sz=50',
        isDefault: false },
     isPlusUser: true,
     language: 'en',
     circledByCount: 7,
     verified: false } }
<iframe src='https://players.brightcove.net/665003303001/SJg0bzqkZ_default/index.html?videoId=5617428088001'
*/
