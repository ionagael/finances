// Replace these with your actual API Key and Sheet ID
const API_KEY = 'AIzaSyDlnhiz-OV6TRIFBfZOOn39BOXo5gkShfw';
const SHEET_ID = 'https://docs.google.com/spreadsheets/d/1n8bK9Aq5HmChRyi8y70pUe0EVkUGTPU3cC8Hx-LdLMs/edit?gid=0#gid=0';

// Function to append data to Google Sheets
const appendToGoogleSheet = (data) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${Finances}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED&key=${AIzaSyDlnhiz-OV6TRIFBfZOOn39BOXo5gkShfw}`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            values: [data],
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Data added to Google Sheets:', data);
        })
        .catch((error) => {
            console.error('Error adding data to Google Sheets:', error);
        });
};

// Modify existing forms to send data to Google Sheets
document.getElementById("income-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const description = document.getElementById("income-description").value;
    const amount = parseFloat(document.getElementById("income-amount").value);

    // Add to local list
    income.push({ description, amount });
    addItem(incomeList, description, amount);
    updateBalance();
    saveToStorage();

    // Append to Google Sheets
    appendToGoogleSheet([description, amount, "Income"]);

    e.target.reset();
});

document.getElementById("expense-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const description = document.getElementById("expense-description").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);

    // Add to local list
    expenses.push({ description, amount });
    addItem(expenseList, description, amount);
    updateBalance();
    saveToStorage();

    // Append to Google Sheets
    appendToGoogleSheet([description, amount, "Expense"]);

    e.target.reset();
});
