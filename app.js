document.addEventListener("DOMContentLoaded", () => {
    const incomeList = document.getElementById("income-list");
    const expenseList = document.getElementById("expense-list");
    const balanceEl = document.getElementById("balance");
    let income = [];
    let expenses = [];
    let balance = 0;

    const updateBalance = () => {
        balance = income.reduce((sum, item) => sum + item.amount, 0) -
                  expenses.reduce((sum, item) => sum + item.amount, 0);
        balanceEl.textContent = balance.toFixed(2);
    };

    const addItem = (list, description, amount) => {
        const item = document.createElement("li");
        item.textContent = `${description}: $${amount.toFixed(2)}`;
        list.appendChild(item);
    };

    document.getElementById("income-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const description = document.getElementById("income-description").value;
        const amount = parseFloat(document.getElementById("income-amount").value);
        income.push({ description, amount });
        addItem(incomeList, description, amount);
        updateBalance();
        e.target.reset();
    });

    document.getElementById("expense-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const description = document.getElementById("expense-description").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        expenses.push({ description, amount });
        addItem(expenseList, description, amount);
        updateBalance();
        e.target.reset();
    });

    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(() => console.log('Service Worker Registered'))
            .catch(err => console.error('Service Worker Registration Failed:', err));
    }
});
