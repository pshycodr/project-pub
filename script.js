document.addEventListener("DOMContentLoaded", function () {
    const expenseCategory = document.getElementById("expense-category");
    const expenseAmount = document.getElementById("expense-amount");
    const expenseItemName = document.getElementById("expense-name");
    const addExpenseBtn = document.getElementById("add-expense-btn");
    const clearExpenseBtn = document.getElementById("clear-all-expense-btn");
    const allExpenseList = document.getElementById("expense-list");
    const totalExpense = document.getElementById("total-expense-list");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function renderExpensesList() {
        allExpenseList.innerHTML = "";
        const expenseList = {};
        expenses.forEach((expense) => {
            if (expenseList[expense.category]) {
                expenseList[expense.category] += expense.amount;
            } else {
                expenseList[expense.category] = expense.amount;
            }
        });

        for (const key of Object.keys(expenseList)) {
            const expenseItem = document.createElement("div");
            expenseItem.classList.add("expense-item");
            expenseItem.innerHTML = `
                <span>${key}</span> : <span>Rs.${expenseList[key].toFixed(2)}</span>
            `;
            allExpenseList.appendChild(expenseItem);
        }
    }

    function renserTotalExpense() {
        let total = 0;
        expenses.forEach((expense) => {
            total += expense.amount;
        });
        totalExpense.innerHTML = `<span>Rs.${total.toFixed(2)}</span>`;
    }

    function addExpenses() {
        const category = expenseCategory.value;
        const amount = parseFloat(expenseAmount.value);
        const itemName = expenseItemName.value;

        if (!category || isNaN(amount) || amount <= 0) {
            alert("Please enter valid category and amount.");
            return;
        }

        const newExpense = {
            category,
            itemName,
            amount,
        };

        expenses.push(newExpense);
        localStorage.setItem("expenses", JSON.stringify(expenses));

        renderExpensesList();
        renserTotalExpense();

        expenseAmount.value = "";
        expenseItemName.value = "";
    }

    function clearAllExpenses() {
        localStorage.clear();
        expenses = [];
        renderExpensesList();
        renserTotalExpense();
    }

    addExpenseBtn.addEventListener("click", addExpenses);
    clearExpenseBtn.addEventListener("click", clearAllExpenses);

    renderExpensesList();
    renserTotalExpense();
});
