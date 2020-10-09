import React from 'react';
import './App.css';
import ExpensePage from "./pages/ExpensePage"
import ReactNotification from 'react-notifications-component'

function App() {
  return (
    <div className="App">
        <ReactNotification />
        <ExpensePage />
    </div>
  );
}

export default App;
