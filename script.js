// Select elements
const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseItems = document.getElementById("expense-items");
const totalExpenses = document.getElementById("total-expenses");
const categoryBreakdown = document.getElementById("category-breakdown");

// Expense array
let expenses = [];

// Add expense
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = expenseName.value;
  const amount = parseFloat(expenseAmount.value);
  const category = expenseCategory.value;

  if (name && amount && category) {
    const expense = { id: Date.now(), name, amount, category };
    expenses.push(expense);
    renderExpenses();
    updateSummary();
    expenseForm.reset();
  }
});

// Render expenses
function renderExpenses() {
  expenseItems.innerHTML = "";

  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.name} - $${expense.amount} (${expense.category})
      <button onclick="deleteExpense(${expense.id})">Delete</button>
    `;
    expenseItems.appendChild(li);
  });
}

// Delete expense
function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  renderExpenses();
  updateSummary();
}

// Update summary
function updateSummary() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalExpenses.textContent = total.toFixed(2);

  const breakdown = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  categoryBreakdown.innerHTML = "";
  for (const [category, amount] of Object.entries(breakdown)) {
    const p = document.createElement("p");
    p.textContent = `${category}: $${amount.toFixed(2)}`;
    categoryBreakdown.appendChild(p);
  }
}