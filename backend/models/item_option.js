const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Item Schema
const ItemOptionSchema = new Schema({
	option_name: {type: String, required:true},
})


module.exports = mongoose.model("ItemOption", ItemOptionSchema)