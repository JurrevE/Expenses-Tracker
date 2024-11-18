import { React, useState } from "react";
import "./styles.css";

function ExpenseTracker() {
	// State for total expenses, expenses list, and input values
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [expensesList, setExpensesList] = useState([]);
	const [nameInput, setNameInput] = useState("");
	const [inputValue, setInputValue] = useState("");

	// Handle form submission to update expenses
	const handleSubmit = (e) => {
		e.preventDefault();
		const amount = parseFloat(inputValue); // convert input to a number
		if (!isNaN(amount) && nameInput.trim()) {
			// make sure it's a valid number and name is not empty
			const newExpense = { name: nameInput, amount };
			setExpensesList((prevList) => [...prevList, newExpense]); // add new expense to the list
			setTotalExpenses((prevTotal) => prevTotal + amount); // update totalExpenses
			setInputValue(""); // reset input value after submission
			setNameInput(""); // reset name input after submission
		} else {
			alert("Please enter a valid expense name and amount.");
		}
	};

	return (
		<div id="maincontent">
			<h1>Expense tracker</h1>
			<h2>Total Expenses:</h2>
			<div className="totalExpenses">{"$" + totalExpenses.toFixed(2)}</div>

			<form action="" id="expensesForm" onSubmit={handleSubmit}>
				<div className="formdiv">
					<label htmlFor="nameInput">Name of Expense</label>
					<input
						id="nameInput"
						className="nameInput"
						type="text"
						placeholder="Starbucks"
						value={nameInput}
						onChange={(e) => setNameInput(e.target.value)}
					/>
				</div>
				<div className="formdiv">
					<label htmlFor="inputValue">Amount</label>
					<input
						id="inputValue"
						className="valueInput"
						value={inputValue}
						type="number"
						placeholder="$12"
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</div>
				<button type="submit">Add Expense</button>
			</form>

			<div id="expensesList">
				<h1>List of Previous Expenses:</h1>
				<ul>
					{expensesList.map((expense, index) => (
						<li key={index}>
							{expense.name}: ${expense.amount.toFixed(2)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default ExpenseTracker;
