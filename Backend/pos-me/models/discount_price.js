const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Item Schema
const DiscountPriceSchema = new Schema({
	discount_price: {type: Number, required:true},
	end_date: {type: Date, required:true},
	user: {type: Schema.Types.ObjectId, ref:'User'}
})


module.exports = mongoose.model("DiscountPrice", DiscountPriceSchema)