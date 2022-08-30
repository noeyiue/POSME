const mongoose = require('mongoose')
const Schema = mongoose.Schema


// ItemType Schema
const ItemTypeSchema = new Schema({
	type_name: {type: String, required:true},
})


module.exports = mongoose.model("ItemType", ItemTypeSchema)