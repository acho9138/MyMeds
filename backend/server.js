// Node Libraries
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
// const cron = require('node-cron');
const LocalStrategy = require('passport-local').Strategy;

// Models
const User = require('./models/user');

// Routes
const routes = require('./routes');

// Environment variables
require('dotenv').config();
const PORT = process.env.PORT || 3001;

// CronJob
// const Reminder = require('./cron/reminder')

// App setup
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
}

app.use(session({
  name: 'session-id',
  secret: '123-456-789',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || `mongodb+srv://acho9138:${process.env.MONGODB_PASSWORD}@cluster0.qzppp.mongodb.net/MyMedsDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

// Cron for sending emails
// cron.schedule('* * * * *', function () {
//   Reminder.medReminder()
// });

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname + '../client/build/index.html'))
);

// Start the API server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
