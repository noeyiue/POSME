const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Bill Schema
const BillSchema = new Schema({
	time : { type: Date, default: Date.now },
	payment_method: { type: String, required:true },
	cash: { type: Number, default: 0 },
	quantity: {
		type: [Schema.Types.ObjectId], 
		ref:'Quantity'
	}
})


module.exports = mongoose.model("Bill", BillSchema)