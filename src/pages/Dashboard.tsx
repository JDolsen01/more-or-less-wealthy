import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import { getMostRecentExpenses, getTotalExpenses } from "../helpers/expense";
import { getMostRecentIncome, getTotalIncome } from "../helpers/income";
import { formatCurrency } from "../helpers/format";
import Table from "../components/Table";
import {
  getBudgets,
  getBudgetTotalsByTerm,
  type Budget,
} from "../helpers/budget";

type Transactions = {
  date: string;
  name: string;
  amount: number;
}[];

function Dashboard() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [recentIncome, setRecentIncome] = useState<Transactions>([]);
  const [recentExpenses, setRecentExpenses] = useState<Transactions>([]);
  const [budgets, setBudgets] = useState<Array<Budget>>([]);
  const [spent, setSpent] = useState<Record<string, number>>({});

  useEffect(() => {
    getTotalExpenses().then((total) => {
      setExpenseTotal(total);
    });
    getTotalIncome().then((total) => {
      setIncomeTotal(total);
    });
    getMostRecentExpenses(5).then((expenses) => {
      setRecentExpenses(expenses);
    });
    getMostRecentIncome(5).then((income) => {
      setRecentIncome(income);
    });
    getBudgets().then((budgets) => {
      setBudgets(budgets);
    });
    getBudgetTotalsByTerm("month", 0).then((totals) => {
      setSpent(totals);
    });
  }, []);
  useEffect(() => {
    setBalance(parseFloat((incomeTotal - expenseTotal).toFixed(2)));
  }, [incomeTotal, expenseTotal]);

  return (
    <div className="flex flex-col items-center justify-start px-4">
      <div className="mt-4 w-full max-w-4xl flex items-center justify-between">
        <h2 className="text-2xl font-bold my-auto">Dashboard</h2>
        <div className="h-12 hidden md:block" />
      </div>
      <div className="max-w-4xl w-full">
        <div className="card shadow flex flex-col p-4 mt-2">
          <h2 className="text-lg font-bold">Totals</h2>
          <div className="flex flex-row justify-between flex-wrap gap-3 w-full mt-1">
            <div className="flex flex-col">
              <div className="stat-title">Total Income</div>
              <div className="flex items-center gap-2">
                <Icon
                  type="inboxPlus"
                  className="text-primary inline-block h-8 w-8 stroke-current"
                />
                <div className="stat-value text-primary">
                  ${formatCurrency(incomeTotal)}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="stat-title">Total Expenses</div>
              <div className="flex items-center gap-2">
                <Icon
                  type="inboxMinus"
                  className="text-secondary inline-block h-8 w-8 stroke-current"
                />
                <div className="stat-value text-secondary">
                  ${formatCurrency(expenseTotal)}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="stat-title">Total Balance</div>
              <div className="flex items-center gap-2">
                <Icon
                  type="inbox"
                  className="inline-block h-8 w-8 stroke-current"
                />
                <div className="stat-value">${balance}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card shadow w-full p-4">
          <h2 className="text-lg font-bold">Recent Income</h2>
          <Table
            header={["Date", "Name", "Amount"]}
            data={recentIncome}
            formattedValues={{
              Amount: (value) => {
                return `$${Number(value).toFixed(2)}`;
              },
            }}
          />
        </div>
        <div className="card shadow w-full p-4">
          <h2 className="text-lg font-bold">Recent Expenses</h2>
          <Table
            header={["Date", "Name", "Amount"]}
            data={recentExpenses}
            formattedValues={{
              Amount: (value) => {
                return `$${Number(value).toFixed(2)}`;
              },
            }}
          />
        </div>
      </div>
      <div className="max-w-4xl w-full mt-4 card shadow">
        <h2 className="text-lg font-bold p-4">Budget Overview</h2>
        <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {budgets.map((budget) => (
            <div key={budget.id} className="w-full flex flex-col">
              <div className="w-full flex justify-between">
                <span>{budget.name}</span>
                <span className="text-xs text-gray-500 self-end">
                  Total: ${budget.amount.toFixed(2)}
                </span>
              </div>
              <div className="grow">
                <progress
                  className="progress progress-primary w-full"
                  value={spent[budget.id] || 0}
                  max={budget.amount}
                ></progress>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Spent: ${spent[budget.id]?.toFixed(2) || 0}
                  </span>
                  <span className="text-xs text-gray-500">
                    Remaining: $
                    {(budget.amount - (spent[budget.id] || 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
