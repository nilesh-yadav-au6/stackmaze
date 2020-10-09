import React from 'react';
import "../styles/Form.css"


function Form(props) {

  return (
    <form noValidate autoComplete="off" className="form-div" onSubmit={props.onSubmit}>
      <input className="text" type="text" name="title" value={props.expense.title} onChange={props.onChange} placeholder="Title" />
      <input className="text" type="number" name="amount" value={props.expense.amount} onChange={props.onChange} placeholder="Amount" />
      <input className="text" type="text"  name="note" value={props.expense.note} onChange={props.onChange} placeholder="Note" />
      <input className="text"  name="date" value={props.expense.date} onChange={props.onChange}  type="date" />
      <input type="submit" className="btn" value="+ ADD EXPENSE" onClick={props.onClick}/>
    </form>
  );
}

export default Form
