const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./auth')

const User = require('../models/user')
const Item = require('../models/item')

router.use(isLoggedIn)


router.post('/add', (req, res, next) => {
	const item = new Item({
		barcode: req.body.barcode,
		name: req.body.name,
		price: req.body.price,
		description: req.body.description
	})
	item.save((err) => {
		if (err) {
			res.status(400).json(err)
		}
		User.findByIdAndUpdate(req.user._id, 
			{$push: {item: item._id}},
	    	{safe: true, upsert: true},
	    	(err, suc) => {
	    		if (err) {
	    			console.log('error')
	    		} else {
	    			console.log('success')
	    		}
	    	}
    	)
    	res.end()
	})
})



module.exports = router