// import libs
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session')
const cors = require('cors')
const LocalStrategy = require('passport-local').Strategy


// import schemas
const User = require('./models/user')


// import routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');



const app = express()
const port = 3000



const dbUrl = 'mongodb://localhost:27017/pos-me'

mongoose.connect(dbUrl, { 
	useNewUrlParser: true
})



const sessionConfig = {
  name: 'session-id',
  secret: 'cattishly-hunter-exorcist-vanquish',
  saveUninitialized: false,
  resave: false
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



app.listen(port, () => {
  console.log(`listening on port ${port}`)
})