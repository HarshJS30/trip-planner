const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    startDate:{type : Date, required : true},
    endDate:{type : Date, required : true},
    location:{type:String,required : true},
    budget:{type:Number},
    activities:{type:[String]},
    createdAt:{type : Date, default: Date.now}
})

const Plan = mongoose.model('Plan',planSchema)

module.exports={
    Plan
}