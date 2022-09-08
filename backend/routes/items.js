const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./auth')

const User = require('../models/user')
const Item = require('../models/item')
const ItemType = require('../models/item_type')
const ItemOption = require('../models/item_option')

router.use(isLoggedIn)


// add item
router.post('/', (req, res) => {
	const { barcode, name, price, description, type, options, discount } = req.body;

	const item = new Item({
		barcode: barcode,
		name: name,
		price: price,
		description: description,
		discount: discount
	});

	// เช็ค ItemType ถ้ามีอยู่ใน collection แล้ว ให้ไปดึง _id ของ type นั้น, ถ้าไม่มีให้สร้าง type ใหม่
	ItemType.find().where('_id').in(req.user.item_type).exec((err, itemTypeArray) => { // เช็คว่า user มี itemType อะไรบ้าง
		if (err) {
			res.status(400).json({1.: err});
		}
		let found = false;
		for (let i = 0; i < itemTypeArray.length; i++){
			if (itemTypeArray[i].type_name === type) {
				found = true;
				Item.findByIdAndUpdate(
					item._id,
					{ type: itemTypeArray[i]._id },
					(err) => {
						if (err) {
							res.status(400).json({2.: err});
						}
					}
				);
				break;
			}
		}
		if (!found) { // สร้าง type ใหม่
			const itemType = new ItemType({
				type_name: type
			});
			itemType.save((err) => {
				if (err) {
					res.status(400).json({3: err});
				}
				User.findByIdAndUpdate( // add new itemType in user
					req.user._id,
					{$push: {item_type: itemType._id}},
					{safe: true, upsert: true},
					(err) => {
						if (err) {
							res.status(400).json({4.: err});
						}
					}
				);
			});
			Item.findByIdAndUpdate( // set type in item
				item._id,
				{ type: itemType._id },
				(err) => {
					if (err) {
						res.status(400).json({5.: err});
					}
				}
			)
		}
	});

	// option
	if (options !== undefined && options.length !== 0) {
		options.forEach(option => {
			ItemOption.findOne({option_name: option}, (err, itemOpiton) => {
				if (err) {
					res.status(400).json({6.: err});
				}
				if (itemOpiton) {
					Item.findByIdAndUpdate(
						item._id,
						{$push: {option: itemOpiton._id}},
						{safe: true, upsert: true},
						(err) => {
							if (err) {
								res.status(400).json({7.: err});
							}
						}
					);
				} else {
					const newItemOption = new ItemOption({
						option_name: option
					});
					newItemOption.save((err) => {
						if (err) {
							res.status(400).json({8.: err});
						}
						Item.findByIdAndUpdate(
							item._id,
							{$push: {option: newItemOption._id}},
							{safe: true, upsert: true},
							(err) => {
								if (err) {
									res.status(400).json({9.: err});
								}
							}
						);
					});
				}
			})
		});
	}

	item.save((err) => {
    if (err) {
      res.status(400).json({10.: err});
    } else {
      User.findByIdAndUpdate(
        req.user._id,
        {$push: {item: item._id}},
        {safe: true, upsert: true},
        (err) => {
          if (err) {
            res.status(400).json({11.: err});
          } else {
            res.status(200).json({message: 'add new item to database complete!'});
          }
        }
      );
    }
  });
});


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