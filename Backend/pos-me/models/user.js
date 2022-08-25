const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')


// User Schema
const UserSchema = new Schema({
	username: {type: String, required:true, unique:true}
})


UserSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model("User", UserSchema)