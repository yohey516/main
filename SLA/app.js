const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require("./config/passport.config");
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const Controller = require("./controllers/controller.js")
const PORT = process.env.PORT;
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error('Failed to connect to MongoDB:', e);
  });


// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(methodOverride('_method'));

//Store session in mongodb to preview re-login on server reload
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 360000 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB,
      secret: process.env.SECRET, 
    }),
  })
);

//-- passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function (request, response, next) {
  response.locals.alerts = request.flash(); //{ success: [], error: []}
  response.locals.currentUser = request.user;
  next();
});


app.use(Controller);


// Show error message 404

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(process.env.PORT, () =>
  console.log(`connected to express on ${process.env.PORT}`)
);
