const express = require('express')  
const passport = require('passport')
const User = require('../models/user')

const router = express.Router()


router.post('/register', (req, res, next) => {
	const this_user = new User({username: req.body.username})
	User.register(this_user, req.body.password, (err) => {
		console.log('check!')
		if (err) {
			res.status(400).json(err)
		}
		res.status(200).json({'message': 'successfully created account'})
		
	})
})


router.post('/login', passport.authenticate('local'), (req, res) => {
	res.status(200).json({'message': 'successfully login'})
})


router.post('/logout', (req, res) => {
	req.logout((err) => {
		if (err) {
			res.status(400).json(err)
		}
		res.status(200).json({'message': 'successfully logged-out'})
	})
})


function isLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		res.status(400).json({'message': 'not logged-in'})
	} else {
		return next()
	}
}


router.get('/is_logged_in_check', (req, res, next) => {
	isLoggedIn(req, res, next)
	res.status(200).json({'message': `logged-in as (${req.user.username})`})
})


module.exports = router






