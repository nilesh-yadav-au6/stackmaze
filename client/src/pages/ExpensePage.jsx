import React ,{useState , useEffect} from 'react'
import Form from "../components/Form"
import "../styles/ExpensePage.css"
import Grid from '@material-ui/core/Grid';
import { store } from 'react-notifications-component';
import axios from "axios"
import Card from "../components/Card"

function ExpensePage() {

    const  [expense , setExpense] = useState(
        {
            title:"",
            amount:"",
            note:"",
            date:""
        }
    )
    const  [updateExpense , setUpdateExpense] = useState(
        {
            title:"",
            amount:"",
            note:"",
            date:""
        }
    )
    const [expenseList , setExpenseList] = useState([])
    const [total , setTotal] = useState("")

    useEffect(() => {
        async function getExpenses() {
            const { data } = await axios(`https://expensetracker-291911.et.r.appspot.com/all/expenses`);
          setExpenseList(data.expenses);
          setTotal(data.totalExpense)
        }
        getExpenses();
      }, [expense,updateExpense]);
    
    const handleDelete =async () => {
        const { data } = await axios(`https://expensetracker-291911.et.r.appspot.com/all/expenses`);
        setExpenseList(data.expenses);
        setTotal(data.totalExpense)
    }

    const updateExpenses = id => async (e) => {
        e.preventDefault()
        await axios.patch(`https://expensetracker-291911.et.r.appspot.com/update/expense/${id}`,updateExpense )
        setUpdateExpense({
            title:"",
            amount:"",
            note:"",
            date:""
        })
    }
  
    const handleChange = (e) => {
      e.preventDefault();
      const value = e.target.value;
      setExpense({
        ...expense,
        [e.target.name]: value,
      });
    } 

    const handleChangeUpdate = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setUpdateExpense({
          ...updateExpense,
          [e.target.name]: value,
        });
      } 
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(typeof(typeof(expense.amount)))
        if(!expense.title || !expense.note || !expense.amount || !expense.date){
          store.addNotification({
            title: "Warning",
            message: "Plese Enter all the fileds",
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
            return
        }
        await axios.post(`https://expensetracker-291911.et.r.appspot.com/add/expenses`, expense)
        setExpense({
            title:"",
            amount:"",
            note:"",
            date:""
        })
    }

    return (
      <>
        <div className="expense-main">
        <Grid container spacing={1}>
          <Grid item xs={12}>
          <div className="header">
            <h1>MY EXPENSES</h1>
            <div className="total-div">
                <p>Total</p>
                <p style={{height:"3rem" ,borderRight:"1px solid lightcoral"}}></p>
                <p style={{fontSize:"40px"}}>{total }</p>
            </div>
        </div>
          </Grid>
          <Grid item xs={12}  md={6}>
            <Form onChange={handleChange} onSubmit={handleSubmit} expense={expense} />    
          </Grid>
          <Grid item xs={12} md={6} className="scrollbar">
            {
                expenseList !== [] ?
                    expenseList.map((expense) => <Card key={expense._id} expense={expense} updateExpense={updateExpense} delete={handleDelete} onChange={handleChangeUpdate}  onSubmit={updateExpenses} />)
                :null
            }
          </Grid>
        </Grid>
      </div>
      </>
    );
}

export default ExpensePage
