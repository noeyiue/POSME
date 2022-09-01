const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Bill Schema
const BillSchema = new Schema({
	time : { type: Date, default: Date.now },
	quantity: {type: [Schema.Types.ObjectId], 
		ref:'Quantity'
	}
})


module.exports = mongoose.model("Bill", BillSchema)