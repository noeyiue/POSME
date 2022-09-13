const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')


// User Schema
const UserSchema = new Schema({
	username: {type: String, required:true, lowercase: true, unique:true},
	f_name: {type: String, required:true},
	l_name: {type: String, required:true},
	store_name: {type: String, required:true},
	address: {type: String, required:true},
	email: {type: String, required:true},
	tax_id: {type: String, required:true},
	promptpay_number: {type: String, required:true},
	item: {
		type: [Schema.Types.ObjectId], 
		ref: 'Item'
	},
	item_type: {
		type: [Schema.Types.ObjectId], 
		ref: 'ItemType'
	},
	bill: {
		type: [Schema.Types.ObjectId], 
		ref: 'Bill'
	}
})


UserSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model("User", UserSchema)