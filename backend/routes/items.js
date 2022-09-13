const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./auth')

const User = require('../models/user')
const Item = require('../models/item')
const ItemType = require('../models/item_type')

router.use(isLoggedIn)


// add item
router.post('/', async (req, res) => {
	const { barcode, name, price, description, type, options, discount } = req.body;

	const payload = {
		barcode: barcode,
		name: name,
		price: price,
		description: description,
		type: undefined,
		option: [],
		discount: discount
	};

	try {
		// หาทุกๆ ItemType ที่ User เก็บ _id ของ ItemType ไว้
		const data = await ItemType.find().where('_id').in(req.user.item_type).exec();

		// type
		let found = false;
		for (let i = 0; i < data.length; i++) { // เช็คว่าเคยเก็บไหม
			if (data[i].type_name === type) {
				found = true;
				payload.type = data[i]._id;
				break;
			}
		}
		if (!found) { // ถ้า User ไม่เคยเก็บ ไปเช็คใน database ก่อนว่าในระบบเคยเก็บ ItemType นี้ไว้ไหม ถ้ามีก็เพิ่มให้ User เลย
			const allItemType = await ItemType.find();
			let alreadyHave = false;
			let _id = undefined;

			for (let i = 0; i < allItemType.length; i++) {
				if (allItemType[i].type_name === type) {
					alreadyHave = true;
					_id = allItemType[i]._id;
					break;
				}
			}
			if (!alreadyHave) { // ถ้าเช็คใน database แล้วก็ไม่เจอ ให้สร้าง ItemType ใหม่เลย
				const itemType = new ItemType({ type_name: type });
				_id = itemType._id;
				await itemType.save();
			}

			await User.findByIdAndUpdate( //เพิ่ม _id ให้ User
				req.user._id,
				{ $push: { item_type: _id } },
				{ safe: true, upsert: true }
			);
			payload.type = _id;
		}

		// option
		if (options !== undefined && options.length !== 0) {
			const data = await ItemOption.find().where('option_name').in(options).exec(); // หา ItemOption ที่มีอยู่ใน database
			const id = data.map(e => e._id);
      id.forEach( e => {
				payload.option.push(e);
      });

			const optionName = data.map(e => e.option_name);
			const notInDatabase = []; // คัดชื่อที่ไม่มีใน database
      for (let i = 0; i < options.length; i++) {
        let name = options[i];
        if (!optionName.includes(name)) {
          notInDatabase.push(name)
        }
      }
      for (let i = 0; i < notInDatabase.length; i++) { // ถ้าไม่มีก็สร้างใหม่เลย
        let itemOption = new ItemOption({ option_name: notInDatabase[i] });
        payload.option.push(itemOption._id);
        itemOption.save();
      }
		}

		const item = new Item(payload);		
		await item.save();
		await User.findByIdAndUpdate(
			req.user._id,
			{ $push: { item: item._id } },
			{ safe: true, upsert: true }
		);

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