const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./auth')

const User = require('../models/user')
const Item = require('../models/item')
const ItemType = require('../models/item_type')
const ItemOption = require('../models/item_option')

router.use(isLoggedIn)


// add item
router.post('/', async (req, res) => {
	const { barcode, name, price, description, type, options, discount } = req.body;

	const item = new Item({
		barcode: barcode,
		name: name,
		price: price,
		description: description,
		type: undefined,
		discount: discount
	});

	try {
		// data = array of ItemType
		const data = await ItemType.find().where('_id').in(req.user.item_type).exec();

		// type
		let found = false;
		for (let i = 0; i < data.length; i++) {
			if (data[i].type_name === type) {
				found = true;
				item.type = data[i]._id;
				break;
			}
		}
		if (!found) {
			const allItemType = await ItemType.find();
			let alreadyHave = false;
			for (let i = 0; i < allItemType.length; i++) {
				if (allItemType[i].type_name === type) {
					alreadyHave = true;
					await User.findByIdAndUpdate(
						req.user._id,
						{ $push: { item_type: allItemType[i]._id } },
						{ safe: true, upsert: true }
					);
					item.type = allItemType[i]._id;
					break;
				}
			}
			if (!alreadyHave) {
				const itemType = new ItemType({ type_name: type });
				await User.findByIdAndUpdate(
					req.user._id,
					{ $push: { item_type: itemType._id } },
					{ safe: true, upsert: true }
				);
				item.type = itemType._id
				await itemType.save();
			}
		}

		await item.save();
		await User.findByIdAndUpdate(
			req.user._id,
			{ $push: { item: item._id } },
			{ safe: true, upsert: true }
		);

		// option
		if (options !== undefined && options.length !== 0) {
			const data = await ItemOption.find().where('option_name').in(options).exec();
			const id = data.map(e => e._id);
      id.forEach( async e => {
        await Item.findByIdAndUpdate(
          item._id,
          { $push: { option: e } }
        );
      });

			const name = data.map(e => e.option_name);
			const notInDatabase = options.filter(e => !name.includes(e));
			notInDatabase.forEach( async name => {
				const itemOption = new ItemOption({ option_name: name });
				await itemOption.save();

				await Item.findByIdAndUpdate(
					item._id,
					{ $push: { option: itemOption._id } }
				);
			});
		}
		res.status(200).json({ message: 'add new item to database complete' });
	} catch (err) {
		res.status(400).json(err);
	}
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