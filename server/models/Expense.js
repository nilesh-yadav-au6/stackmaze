const mongoose = require("mongoose")
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    title:{
        type:String,
    },
    amount:{
        type:Number,
    },
    note:{
        type:String,
    },
    date:{
        type:Date,
    }
})


const Expense = mongoose.model("expense" , expenseSchema)
module.exports = Expense