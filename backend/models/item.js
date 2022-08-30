const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Item Schema
const ItemSchema = new Schema({
	barcode: {type: Number, required:true, unique:true},
	name: {type: String, required:true},
	price: {type: Number, required:true},
	description: {type: String},
	//ref
	type: {type: Schema.Types.ObjectId, ref:'ItemType'},
	option: {type: [Schema.Types.ObjectId], 
		ref:'ItemOption'
	},
	discount: {
		is_discount: {type: Boolean, default: false, required: true},
		discount_price:  {type: Number},
		end_date: {type: Date},
	},
})


module.exports = mongoose.model("Item", ItemSchema)