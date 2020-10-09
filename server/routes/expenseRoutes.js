const express = require('express')
const router = express.Router()

const { addExpense ,getAllExpenses ,updateExpense ,deleteEXpense} = require("../controllers/expenseControllers")

router.post("/add/expenses" , addExpense)
router.get("/all/expenses",getAllExpenses)
router.patch("/update/expense/:expenseId", updateExpense)
router.delete("/delete/expense/:expenseId" ,deleteEXpense)


module.exports = router