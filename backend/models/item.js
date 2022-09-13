const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Item Schema
const ItemSchema = new Schema({
	barcode: {type: Number, required:true},
	name: {type: String, required:true},
	price: {type: Number, required:true},
	description: {type: String},
	//ref
	type: {type: Schema.Types.ObjectId, ref:'ItemType'}
})


module.exports = mongoose.model("Item", ItemSchema)