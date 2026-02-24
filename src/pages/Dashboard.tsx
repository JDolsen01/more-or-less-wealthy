import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import { getTotalExpenses } from "../helpers/expense";
import { getTotalIncome } from "../helpers/income";
import { formatCurrency } from "../helpers/format";

function Dashboard() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getTotalExpenses().then((total) => {
      setExpenseTotal(total);
    });
    getTotalIncome().then((total) => {
      setIncomeTotal(total);
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
        <div className="card shadow flex flex-row flex-wrap justify-between w-full mt-2">
          <div className="flex flex-col p-4">
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
          <div className="flex flex-col p-4">
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
          <div className="flex flex-col p-4">
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
  );
}

export default Dashboard;
