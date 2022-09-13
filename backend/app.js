// import libs
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session')
const cors = require('cors')
const LocalStrategy = require('passport-local').Strategy

// const fs = require("fs");
// const https = require("https");


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



const app = express()
const port = 3000



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


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


// https
//   .createServer(
//     {
//       key: fs.readFileSync("server.key"),
//       cert: fs.readFileSync("server.cert"),
//     },
//     app
//   )
//   .listen(2096, function () {
//     console.log(
//       "app listening on port 2096!"
//     );
//   });