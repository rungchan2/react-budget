import { useState } from "react";
import "./App.css";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Alert from "./Alert";

const App = () => {

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, charge: '식비', amount: 1600 },
    { id: 2, charge: '수수료', amount: 400 },
    { id: 3, charge: '영수증', amount: 1200 },
  ]);
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    text: ''
  });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');
 
  const handleEdit = (id) => {
    const expense = expenses.find(expense => expense.id === id);
    const {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: "danger", text: "지출이 삭제되었습니다." });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (charge !== "" && amount > 0) {

      if (edit) {
        const newExpenses = expenses.map(item => 
          {return item.id === id ? {...item, charge: charge, amount: amount} : item}); 
          setExpenses(newExpenses);
          handleAlert({ type: "success", text: "지출이 수정되었습니다." });
          setEdit(false);
      } else {
      const newExpense = {
        id: crypto.randomUUID(), charge, amount};
      const newExpenses = [...expenses, newExpense];
      setExpenses(newExpenses);
      handleAlert({ type: "success", text: "지출이 추가되었습니다." });
    }
      setCharge("");
      setAmount(0);
    
    } else {
      console.log("에러");
      handleAlert({ type: "danger", text: "charge는 빈값일 수 없으며, amount는 0보다 큰 값이어야 합니다." });
    }
  };

  const clearItems = () => {
    setExpenses([]);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({
      show: true,
      type: type,
      text: text
    });
    setTimeout(() => {
      setAlert({
        show: false,
        type: '',
        text: ''
      });
    }, 7000);
  };

  return (
    <main className="main-container">
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>예산계산기</h1>
      <div className="divs">
        {/* 지출 폼 */}
        <ExpenseForm
          charge={charge}
          amount={amount}
          edit={edit}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="divs">
        {/* 지출 아이템 */}
        <ExpenseList
          initialExpense={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>
      <div style={{ display: "flex", justifyContent: 'end', marginTop: '1rem' }}>
        <p style={{ fontSize: '2rem' }}>
          총 지출: {expenses.reduce((acc, curr) => acc + curr.amount, 0)} 원
        </p>
      </div>
    </main>
  );
}

export default App;