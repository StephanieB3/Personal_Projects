import sys
import datetime

def calculate_monthly_budget(income, expenses)
  total_expenses = sum(expenses)
  savings = income - total_expenses

  budget = {
    "Income": income,
    "Total Expenses": total_expenses,
    "Savings": savings
  }

  return budget

print('Welcome to the Monthly Budget Calculator')

income = float(input("Please enter your monthly income ($): "))

num_expenses = int(input("Enter the number of expense categories: "))

expenses = []
for i in range(num_expenses):
  expense = float(input(f"Enter the amount for expense #{i+1}: "))
  expenses.append(expense)

budget = calculate_monthly_budget(income, expense)

print('\nMonthly Budget Breakdown:')

for category, amount in budget.items():
  print(f"{category}:${amount:.2f}")
