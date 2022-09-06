const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./auth')

const User = require('../models/user')
const Item = require('../models/item')

router.use(isLoggedIn)


// add item
router.post('/', (req, res, next) => {
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


// get item list
router.get('/', (req, res, next) => {
	User.findById(req.user._id, {_id:0, item: 1}, (err, id_list) => {
		if (err) {
			res.status(400).json(err)
		}
		Item.find().where('_id').in(id_list.item).exec((err, data) => {
			if (err) {
				res.status(400).json(err)
			}
			res.json(data)
		})
	})
	
})


// get one item by id
router.get('/id/:item_id', (req, res, next) => {
	item_id = req.params['item_id']
	Item.findById(item_id, (err, data) => {
		if (err) {
			res.status(400).json(err)
		}
		res.json(data)
	})
})


// get one item by barcode
router.get('/:barcode', (req, res, next) => {
	const barcode = req.params['barcode'];
	Item.findOne({barcode}, (err, data) => {
		if (err) {
			res.status(400).json(err)
		}
		res.json(data)
	})
})


// delete item by barcode
router.delete('/:barcode', (req, res, next) => {
	const barcode = req.params['barcode'];

	Item.findOne({barcode: barcode}, (err, data) => {
		const item_id = data._id

		User.findByIdAndUpdate(req.user._id, 
			{$pull: {item: item_id}},
		    (err) => {
		    	if (err) {
		    		console.log(err)
		    	}
		    	Item.deleteOne({_id: item_id}, (err) => {
					if (err) {
						res.status(400).json(err)
					}
					res.end()
				})
		    }
	    )
	})
})


// update item by barcode
router.put('/:barcode', (req, res, next) => {
	const barcode = req.params['barcode'];

	const item = {
		barcode: req.body.barcode,
		name: req.body.name,
		price: req.body.price,
		description: req.body.description
	}

	User.findOneAndUpdate({barcode: barcode}, item, (err, suc) => {
	    	if (err) {
	    		console.log(err)
	    	}
	    	res.end()
	   })
})

	    

module.exports = router