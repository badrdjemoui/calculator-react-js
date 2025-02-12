import React, { useState } from "react";
import "./App.css";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const calculate = (operation) => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || (isNaN(number2) && operation !== "√")) {
      setError("الرجاء إدخال أرقام صحيحة!");
      return;
    }

    setError("");
    let res;
    switch (operation) {
      case "+":
        res = number1 + number2;
        break;
      case "-":
        res = number1 - number2;
        break;
      case "*":
        res = number1 * number2;
        break;
      case "/":
        res = number2 !== 0 ? number1 / number2 : "خطأ: القسمة على صفر!";
        break;
      case "^":
        res = Math.pow(number1, number2);
        break;
      case "√":
        res = number1 >= 0 ? Math.sqrt(number1) : "خطأ: عدد غير صالح للجذر!";
        break;
      case "%":
        res = number1 % number2;
        break;
      case "٪":
        res = (number1 * number2) / 100;
        break;
      default:
        res = "عملية غير معروفة!";
    }
    setResult(res);
    setHistory([...history, `${number1} ${operation} ${number2} = ${res}`]);
  };

  const clearFields = () => {
    setNum1("");
    setNum2("");
    setResult(null);
    setError("");
  };

  return (
    <div className="calculator-container">
      <h1>آلة حاسبة متقدمة</h1>
      <input type="number" placeholder="الرقم الأول" value={num1} onChange={(e) => setNum1(e.target.value)} />
      <input type="number" placeholder="الرقم الثاني" value={num2} onChange={(e) => setNum2(e.target.value)} />
      {error && <p className="error-message">{error}</p>}

      <div className="buttons-container">
        {["+", "-", "*", "/", "^", "√", "%", "٪"].map((op) => (
          <button key={op} onClick={() => calculate(op)}>{op}</button>
        ))}
      </div>
      <button className="clear-button" onClick={clearFields}>مسح</button>
      <h2>النتيجة: {result !== null ? result : "—"}</h2>
      <div className="history">
        <h3>التاريخ</h3>
        <ul>
          {history.length > 0 ? history.map((entry, index) => <li key={index}>{entry}</li>) : <p>لا يوجد عمليات سابقة</p>}
        </ul>
      </div>
    </div>
  );
};

export default function App() {
  return <Calculator />;
}
