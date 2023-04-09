const express = require('express');
const { google } = require('googleapis');
const app = express();

const { initializeApp, cert } = require('firebase-admin/app');

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const fetch = require('node-fetch');

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

  // get google user profile info
  const oauth2 = google.oauth2({
    version: 'v2',
    auth: oauth2Client,
  });

  const googleUserInfo = await oauth2.userinfo.get();
  console.log(googleUserInfo.data);

  // console.log(tokens);
  res.send('test');

  // res.redirect(
  //   `http://localhost:3000?accessToken=${tokens.access_token}&refreshToken=${tokens.refresh_token}`
  // );
});

app.get('/refresh', async (req, res) => {
  res.send('Hello');
});

app.post('/getValidToken', async (req, res) => {
  // console.log(req.body);
  try {
    const request = await fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: req.body.refreshToken,
        grant_type: 'refresh_token',
      }),
    });
    const data = await request.json();
    console.log('server 74 | data', data.access_token);

    res.json({
      accessToken: data.access_token,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

app.listen(8080, () => console.log('Listening to requests on port 8080'));
