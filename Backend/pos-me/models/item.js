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
	option: {type: Schema.Types.ObjectId, ref:'ItemOption'},
	discount: {type: Schema.Types.ObjectId, ref:'DiscountPrice'},
	old: {type: Schema.Types.ObjectId, ref:'OldItem'}
	user: {type: Schema.Types.ObjectId, ref:'User'},

})


module.exports = mongoose.model("Item", ItemSchema)