const Expense = require("../models/Expense")


module.exports = {
    addExpense : async (req, res) => {
        try{
            
            const { title ,amount,note,date } = req.body
            const expenses = await Expense.create({title,amount,note,date})
            res.json({StatusCode: 201 , expenses})
            
        }catch(err){
            throw(err)
        }
    },
    getAllExpenses :async (req,res) => {
        try{
            let initialValue = 0
            const expenses = await Expense.find({})
            const totalExpense = expenses.reduce((total , expense) => {
                return total + expense.amount
            },initialValue )
            res.json(({statusCode : 201 , expenses , totalExpense}))

        }catch(err){
            throw(err)
        }
    },
    updateExpense :async(req,res) => {
        try{
            const { expenseId } = req.params
            const { title ,note, amount,date } = req.body
            const expense = await Expense.findOne({_id:expenseId})

            console.log(expense)
            if(title || note || amount || date){
                if(title) await expense.updateOne({title})
                if(note) await expense.updateOne({note})
                if(amount) await expense.updateOne({amount})
                if(date) await expense.updateOne({date})
            }
            return res.status(200).json({ statusCode: 200, message: 'Updated Sucseesfully' });

        }catch(err){
            throw(err)
        }
    },
    deleteEXpense:async (req,res) => {
        try{
            const expense = await Expense.findOne({ _id: req.params.expenseId})
            await expense.remove()
            return res.status(200).json({ statusCode: 200, message: 'Deleted Sucseesfully' });
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}