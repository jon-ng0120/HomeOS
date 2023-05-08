const express = require('express');
const { google } = require('googleapis');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user');
const websiteRouter = require('./routes/websites');

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const DEFAULT_WEBSITES = [
  {
    name: 'Google',
    url: 'https://www.google.com/',
    icon: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://google.com&size=64',
  },
  {
    name: 'Reddit',
    url: 'https://old.reddit.com/',
    icon: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://reddit.com&size=64',
  },
  {
    name: 'YouTube',
    url: 'https://old.reddit.com/',
    icon: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://youtube.com&size=64',
  },
];

const mongoDBURI = process.env.MONGO_DB;
mongoose
  .connect(mongoDBURI)
  .then((result) =>
    app.listen(8080, () => console.log('Listening to requests on port 8080'))
  )
  .catch((err) => console.log(err));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const fetch = require('node-fetch');

app.use('/website', websiteRouter);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8080/handleGoogleRedirect' // server redirect url handler
);

app.post('/createAuthLink', cors(), (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      //calendar api scopes
      'https://www.googleapis.com/auth/calendar',
      'email',
      'profile',
    ],
    prompt: 'consent',
  });
  res.send({ url });
});

app.get('/handleGoogleRedirect', async (req, res) => {
  const authorizationCode = req.query.code;
  const { tokens } = await oauth2Client.getToken(authorizationCode);
  oauth2Client.setCredentials(tokens);
  console.log(tokens);
  // get google user profile info
  const oauth2 = google.oauth2({
    version: 'v2',
    auth: oauth2Client,
  });
  const googleUserInfo = await oauth2.userinfo.get();
  const { id, email, name, given_name, family_name, picture } =
    googleUserInfo.data;
  const userExist = await User.findOne({ google_id: id });
  if (!userExist) {
    const user = new User({
      google_id: id,
      email,
      name,
      given_name,
      family_name,
      picture,
      websites: DEFAULT_WEBSITES,
      refresh_token: tokens.refresh_token,
    });
    await user.save();
  }
  res.redirect(`http://localhost:3000?id=${id}`);
});

app.post('/getValidToken', async (req, res) => {
  const currentUser = await User.findOne({
    google_id: req.body.googleId,
  });
  try {
    if (currentUser) {
      const request = await fetch(
        'https://www.googleapis.com/oauth2/v4/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            refresh_token: currentUser.refresh_token,
            grant_type: 'refresh_token',
          }),
        }
      );
      const data = await request.json();
      res.json({
        accessToken: data.access_token,
        email: currentUser.email,
        username: currentUser.name,
        picture: currentUser.picture,
        websites: currentUser.websites,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});
