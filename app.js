document.addEventListener("DOMContentLoaded", () => {
    const incomeList = document.getElementById("income-list");
    const expenseList = document.getElementById("expense-list");
    const balanceEl = document.getElementById("balance");

    let income = [];
    let expenses = [];
    let balance = 0;

    // Load Data from Local Storage
    const loadFromStorage = () => {
        const storedIncome = JSON.parse(localStorage.getItem("income")) || [];
        const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
        income = storedIncome;
        expenses = storedExpenses;

        income.forEach((item) => addItem(incomeList, item.description, item.amount));
        expenses.forEach((item) => addItem(expenseList, item.description, item.amount));

        updateBalance();
    };

    // Save Data to Local Storage
    const saveToStorage = () => {
        localStorage.setItem("income", JSON.stringify(income));
        localStorage.setItem("expenses", JSON.stringify(expenses));
    };

    // Update Balance
    const updateBalance = () => {
        balance = income.reduce((sum, item) => sum + item.amount, 0) -
                  expenses.reduce((sum, item) => sum + item.amount, 0);
        balanceEl.textContent = balance.toFixed(2);
        localStorage.setItem("balance", balance); // Persist the balance
    };

    // Add Item to UI and Array
    const addItem = (list, description, amount) => {
        const item = document.createElement("li");
        item.textContent = `${description}: $${amount.toFixed(2)}`;
        list.appendChild(item);
    };

    // Income Form Submission
    document.getElementById("income-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const description = document.getElementById("income-description").value;
        const amount = parseFloat(document.getElementById("income-amount").value);
        income.push({ description, amount });
        addItem(incomeList, description, amount);
        updateBalance();
        saveToStorage();
        e.target.reset();
    });

    // Expense Form Submission
    document.getElementById("expense-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const description = document.getElementById("expense-description").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        expenses.push({ description, amount });
        addItem(expenseList, description, amount);
        updateBalance();
        saveToStorage();
        e.target.reset();
    });

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(() => console.log('Service Worker Registered'))
            .catch(err => console.error('Service Worker Registration Failed:', err));
    }

    // Initialize App
    loadFromStorage();
});
