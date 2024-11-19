import { React, useState } from "react";
import "./styles.css";

function ExpenseTracker() {
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [expensesList, setExpensesList] = useState([]);
	const [nameInput, setNameInput] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [editIndex, setEditIndex] = useState(null);
	const [buttonText, setButtonText] = useState("Add Expense");

	const handleClick = () => {
		setButtonText((prevText) =>
			prevText === "Add Expense" ? "Save edited" : "Add Expense"
		);
	};

	const handleEdit = (index) => {
		setEditIndex(index);
		console.log("editindex is:" + editIndex);
		console.log(index);
		console.log(expensesList[index].name);
		console.log(expensesList[index].amount);
		setInputValue(expensesList[index].amount);
		setNameInput(expensesList[index].name);
		handleClick();
	};

	const handleDelete = (index) => {
		console.log("Deleting expense at index:", index);
		const expenseToDelete = expensesList[index];
		setTotalExpenses((prevTotal) => prevTotal - expenseToDelete.amount);
		setExpensesList((prevList) => prevList.filter((_, i) => i !== index));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const amount = parseFloat(inputValue);
		if (!isNaN(amount) && nameInput.trim()) {
			const newExpense = { name: nameInput, amount };
			setExpensesList((prevList) => [...prevList, newExpense]);
			setTotalExpenses((prevTotal) => prevTotal + amount);
			setInputValue("");
			setNameInput("");
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
				<button id="submitButton" type="submit">
					{buttonText}
				</button>
			</form>

			<div id="expensesList">
				<h1>List of Previous Expenses:</h1>
				<ul>
					{expensesList.map((expense, index) => (
						<li key={index}>
							{expense.name}: ${expense.amount.toFixed(2)}
							<button id="editButton" onClick={() => handleEdit(index)}>
								Edit Expense
							</button>
							<button id="deleteButton" onClick={() => handleDelete(index)}>
								Delete Expense
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default ExpenseTracker;
