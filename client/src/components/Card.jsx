import React from "react";
import "../styles/Card.css";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Form from "../components/Form"
import rupee from "../rupee.png"
import edit from "../edit.png"
import x from "../x.png"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#6200EE",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Card(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleClick = async (id) => {
        await axios.delete(`https://expensetracker-291911.et.r.appspot.com/delete/expense/${id}`)
        props.delete()
  }

  const timestamp=new Date(props.expense.date).getTime();
  const todate=new Date(timestamp).getDate();
  const tomonth=new Date(timestamp).getMonth()+1;
  const toyear=new Date(timestamp).getFullYear();
  const original_date=tomonth+' . '+todate+' . '+toyear;

  return (
        <>
        <div className="card-main">
      <div style={{margin:"1rem 1rem",opacity:"0.5"}} onClick={handleOpen}>
        <img src={edit} alt="edit"/>
        <p style={{color:"#A9A9A9"}}>Edit</p>
      </div>
      <div className="outer-card">
        <div className="card">
        <small style={{color:"#A9A9A9"}}>{original_date}</small>
        <h3 style={{color:"#6200EE"}}>{ props.expense.title }</h3>
        <small style={{color:"#C0C0C0"}}>
          <strong style={{color:"gray"}}>NOTE </strong>{props.expense.note}
        </small>
        </div>
        <p style={{color:"black" ,fontWeight:"bold" , fontSize:"16px"}}><img src={rupee} width="12px" height="12px" alt="rupee" srcset=""/>{props.expense.amount}</p>
      </div>
      <div>
        <div style={{margin:"1rem 1rem" ,opacity:"0.5"}} value={props.expense.amount} onClick={() => handleClick(props.expense._id)}>
        <img src={x} alt="edit"/>
        <p style={{color:"#A9A9A9"}}>Remove</p>
      </div>
      </div>
    </div>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <Form onChange={props.onChange} onClick={handleClose} onSubmit={props.onSubmit(props.expense._id)} expense={props.updateExpense}/>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default Card;
