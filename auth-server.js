var path = require('path');
var qs = require('querystring');
var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose');
var request = require('request');

var config = require('./auth-config');

var userSchema = new mongoose.Schema({
  email: { type: String, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  picture: String,
  provider: String,
  provider_id: String
});

userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};

var User = mongoose.model('User', userSchema);

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function (err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

var app = express();
app.set('port', process.env.PORT || 5000);
//app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
  app.use(function (req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}

app.use(express.static(path.join(__dirname, '/dist')));

//#region Login Required Middleware

function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}
//#endregion

function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

//#region /app/profile

app.get('/api/profile', ensureAuthenticated, function (req, res) {
  User.findById(req.user, function (err, user) {
    res.send(user);
  });
});

//#endregion

//#region /app/me

app.put('/api/me', ensureAuthenticated, function (req, res) {
  User.findById(req.user, function (err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    user.save(function (err) {
      res.status(200).end();
    });
  });
});

//#endregion

//#region /auth/login
app.post('/auth/login', function (req, res) {
  User.findOne({ email: req.body.email }, '+password', function (err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email and/or password' });
      }
      res.send({ token: createJWT(user) });
    });
  });
});

//#endregion

//#region  Create Email and Password Account
app.post('/auth/signup', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken' });
    }
    var user = new User({
      displayName: req.body.displayName,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function (err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.send({ token: createJWT(result) });
    });
  });
});

//#endregion


//#region  /auth/google -- Login with Google
app.post('/auth/google', function (req, res) {
  var accessTokenUrl = 'https://www.googleapis.com/oauth2/v4/token';
  var peopleApiUrl = 'https://www.googleapis.com/oauth2/v2/userinfo?fields=email%2Cfamily_name%2Cgender%2Cgiven_name%2Chd%2Cid%2Clink%2Clocale%2Cname%2Cpicture%2Cverified_email';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.GOOGLE_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };
  var token_request = 'code=' + req.body.code +
    '&client_id=' + req.body.clientId +
    '&client_secret=' + config.GOOGLE_SECRET +
    '&redirect_uri=' + req.body.redirectUri +
    '&grant_type=authorization_code';
  var request_length = token_request.length;
  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { body: token_request, headers: { 'Content-type': 'application/x-www-form-urlencoded' } }, function (err, response, token) {
    var accessToken = JSON.parse(token).access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function (err, response, profile) {
      if (profile.error) {
        return res.status(500).send({ message: profile.error.message });
      }
      var user = new User();
      user.provider_id = profile.id;
      user.provider = "google";
      user.email = profile.email;
      user.picture = profile.picture.replace('sz=50', 'sz=200');
      user.displayName = profile.name;
      res.send({ token: accessToken, user: user });

    });
  });
})
  //#endregion

  //#region  /auth/google -- Login with Facebook
  app.post('/auth/facebook', function (req, res) {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name', 'picture.type(large)'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.FACEBOOK_SECRET,
      redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params, json: true }, function (err, response, accessToken) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: accessToken.error.message });
      }

      // Step 2. Retrieve profile information about the current user.
      request.get({ url: graphApiUrl, qs: accessToken, json: true }, function (err, response, profile) {
        if (response.statusCode !== 200) {
          return res.status(500).send({ message: profile.error.message });
        }
        var user = new User();
        user.provider_id = profile.id;
        user.provider = "facebook";
        user.email = profile.email;
        user.picture = profile.picture.data.url;
        user.displayName = profile.name;
        res.send({ token: accessToken, user: user });
      });
    });
  });
  //#endregion

  //#region  Start the Server

  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'dist/index.html'));
  // });
  app.all('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'dist/index.html'));
  });
  app.listen(app.get('port'), app.get('host'), function () {
    console.log('Server is listening on port ' + app.get('port'));
  });

  //#endregion