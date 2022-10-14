// import libs
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session')
const cors = require('cors')
const LocalStrategy = require('passport-local').Strategy

// import https
const fs = require("fs");
const https = require("https");


// import schemas
const User = require('./models/user')
const Item = require('./models/item')
const ItemType = require('./models/item_type')
const Bill = require('./models/bill')
const Quantity = require('./models/quantity')


// import routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/items');
const cashierRouter = require('./routes/cashier');



const app = express()
const port = 2095
const https_port = 2096



const dbUrl = 'mongodb://localhost:27017/pos-me'
// const dbUrl = 'mongodb+srv://dollar:siryossvaris@cluster0.pp3rv1f.mongodb.net/POS-ME'

mongoose.connect(dbUrl, { 
	useNewUrlParser: true
})



const sessionConfig = {
  name: 'session-id',
  secret: 'cattishly-hunter-exorcist-vanquish',
  saveUninitialized: false,
  resave: false,
  cookie: { httpOnly: false }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(express.json())
app.use(cors())



app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/items', itemsRouter)
app.use('/cashier', cashierRouter);


// listen port http..
app.listen(port, () => {
  console.log(`[http ] app listening on port ${port}`)
})


// listen port https...
https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(https_port, function () {
    console.log(
      `[https] app listening on port ${https_port}`
    );
  });
