const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Item Schema
const ItemOptionSchema = new Schema({
	option_name: {type: String, required:true},
	item: {type: Schema.Types.ObjectId, ref:'Item'}
	user: {type: Schema.Types.ObjectId, ref:'User'}
})


module.exports = mongoose.model("ItemOption", ItemOptionSchema)