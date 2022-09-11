const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Quantity Schema
const QuantitySchema = new Schema({
	item_name: {type: String, required: true},
	total_sales: {type: Number, required: true},
	quantity: {type: Number, required: true},
	item: {type: Schema.Types.ObjectId, ref:'Item'}
})


module.exports = mongoose.model("Quantity", QuantitySchema)