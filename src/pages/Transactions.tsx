import { useRef, useState, useEffect } from "react";
import InputFormModal, {
  handleEditOpenModal,
  handleOpenModal,
} from "../components/InputFormModal";
import Table from "../components/Table";
import {
  createIncome,
  deleteIncome,
  getIncomes,
  getIncomesByTerm,
  updateIncome,
  type Income,
} from "../helpers/income";
import { type Budget, getBudgets } from "../helpers/budget";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  getExpensesByTerm,
  updateExpense,
  type Expense,
} from "../helpers/expense";
import BarChart from "../components/BarChart";
import Icon from "../components/Icon";
import { getTermLabel, setTermDatapoints, type Terms } from "../helpers/terms";

function Transactions() {
  const [currentIncome, setCurrentIncome] = useState<Record<string, any>>({});
  const [currentExpense, setCurrentExpense] = useState<Record<string, any>>({});
  const [incomes, setIncomes] = useState<Array<Income>>([]);
  const [expenses, setExpenses] = useState<Array<Expense>>([]);

  const [termLabel, setTermLabel] = useState<string>("");
  const [currentTerm, setCurrentTerm] = useState<Terms>("month");
  const [page, setPage] = useState<number>(0);

  const [incomeDatapoints, setIncomeDatapoints] = useState<Array<number>>([]);
  const [expenseDatapoints, setExpenseDatapoints] = useState<Array<number>>([]);
  useEffect(() => {
    setIncomeDatapoints(
      setTermDatapoints(
        currentTerm,
        page,
        incomes.map((income) => ({ date: income.date, amount: income.amount })),
      ),
    );
    setExpenseDatapoints(
      setTermDatapoints(
        currentTerm,
        page,
        expenses.map((expense) => ({
          date: expense.date,
          amount: expense.amount,
        })),
      ),
    );
  }, [incomes, expenses, currentTerm, page]);

  const [budgets, setBudgets] = useState<Array<Budget>>([]);
  useEffect(() => {
    getBudgets().then((data) =>
      setBudgets(
        data.map((item) => ({
          id: item.id,
          name: item.name,
          amount: item.amount,
        })),
      ),
    );
  }, []);

  useEffect(() => {
    setTermLabel(getTermLabel(currentTerm, page));
    getIncomesByTerm(currentTerm, page).then((data) =>
      setIncomes(
        data.map((item) => ({
          id: item.id,
          date: item.date,
          name: item.name,
          amount: item.amount,
        })),
      ),
    );
    getExpensesByTerm(currentTerm, page).then((data) =>
      setExpenses(
        data.map((item) => ({
          id: item.id,
          date: item.date,
          name: item.name,
          budget: item.budget,
          amount: item.amount,
        })),
      ),
    );
  }, [currentTerm, page]);

  const addIncomeModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const addExpenseModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const editIncomeModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const editExpenseModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const deleteIncomeModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const deleteExpenseModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  return (
    <div className="flex flex-col items-center justify-start px-4">
      <div className="mt-4 mb-2 w-full max-w-4xl grid grid-cols-3 gap-4">
        <h1 className="text-2xl font-bold my-auto col-span-2 md:col-span-1">
          {termLabel}
        </h1>
        <div className="tabs tabs-box w-full grid md:grid-none grid-cols-3 md:w-fit place-self-center col-span-3 order-first md:order-none md:col-span-1">
          <input
            type="radio"
            name="time-frame"
            className="tab w-full text-center"
            aria-label="Month"
            onClick={() => {
              setCurrentTerm("month");
              setPage(0);
            }}
            defaultChecked
          />
          <input
            type="radio"
            name="time-frame"
            className="tab w-full text-center"
            aria-label="Quarter"
            onClick={() => {
              setCurrentTerm("quarter");
              setPage(0);
            }}
          />
          <input
            type="radio"
            name="time-frame"
            className="tab w-full text-center"
            aria-label="Year"
            onClick={() => {
              setCurrentTerm("year");
              setPage(0);
            }}
          />
        </div>
        <div className="dropdown dropdown-end my-auto w-fit place-self-end">
          <div tabIndex={0} role="button" className="btn btn-primary">
            <Icon type="plus" /> Add
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-fit p-2 mt-1 shadow-sm"
          >
            <li>
              <a onClick={() => handleOpenModal(addIncomeModal)}>
                <Icon type="inboxPlus" /> Income
              </a>
            </li>
            <li>
              <a onClick={() => handleOpenModal(addExpenseModal)}>
                <Icon type="inboxMinus" /> Expense
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="tabs tabs-border w-full max-w-4xl">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="All"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <BarChart
            className="text-center"
            data={[
              {
                key: "Income",
                value: incomeDatapoints,
              },
              {
                key: "Expenses",
                value: expenseDatapoints,
              },
            ]}
          />
          <Table
            data={[
              ...incomes,
              ...expenses.map(({ budget, ...rest }) => rest),
            ].sort((a, b) => (a.date > b.date ? 1 : -1))}
          />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Income"
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <BarChart
            className="col-span-2 order-first md:order-none md:col-span-3 text-center"
            data={[
              {
                key: "Income",
                value: incomeDatapoints,
              },
            ]}
          />
          <Table
            data={incomes}
            actions={[
              {
                action: (row) =>
                  handleEditOpenModal(editIncomeModal, row, setCurrentIncome),
                type: "edit",
              },
              {
                action: (row) =>
                  handleEditOpenModal(deleteIncomeModal, row, setCurrentIncome),
                type: "delete",
              },
            ]}
          />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Expenses"
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <BarChart
            data={[
              {
                key: "Expenses",
                value: expenseDatapoints,
              },
            ]}
          />
          <Table
            data={expenses}
            actions={[
              {
                action: (row) =>
                  handleEditOpenModal(editExpenseModal, row, setCurrentExpense),
                type: "edit",
              },
              {
                action: (row) =>
                  handleEditOpenModal(
                    deleteExpenseModal,
                    row,
                    setCurrentExpense,
                  ),
                type: "delete",
              },
            ]}
          />
        </div>
      </div>
      <span className="mt-2 w-full flex justify-center">
        <div className="join grid grid-cols-2 w-fit">
          <button
            className="join-item btn btn-outline"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            className="join-item btn btn-outline"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </span>
      <InputFormModal
        id="addIncomeModal"
        ref={addIncomeModal}
        title="Add Income"
        inputs={[
          { label: "Date", type: "date" },
          { label: "Name", type: "text" },
          { label: "Amount", type: "number" },
        ]}
        action="Add"
        onSubmit={async (formData) => {
          await createIncome(formData);
          if (setIncomes) {
            const incomes = await getIncomes();
            const mapped = incomes.map((item) => ({
              id: item.id,
              date: item.date,
              name: item.name,
              amount: item.amount,
            }));
            setIncomes(mapped);
          }
        }}
      />
      <InputFormModal
        id="addExpenseModal"
        ref={addExpenseModal}
        title="Add Expense"
        inputs={[
          { label: "Date", type: "date" },
          { label: "Name", type: "text" },
          {
            label: "Budget",
            type: "select",
            value: budgets[0]?.id,
            options: budgets.map((budget) => ({
              name: budget.name,
              value: budget.id,
            })),
          },
          { label: "Amount", type: "number" },
        ]}
        onSubmit={async (formData) => {
          await createExpense(formData);
          if (setExpenses) {
            const expenses = await getExpenses();
            const mapped = expenses.map((item) => ({
              id: item.id,
              date: item.date,
              name: item.name,
              budget: item.budget,
              amount: item.amount,
            }));
            setExpenses(mapped);
          }
        }}
        action="Add"
      />
      <InputFormModal
        id="editIncomeModal"
        ref={editIncomeModal}
        title="Edit Income"
        inputs={[
          { label: "Id", type: "hidden", value: currentIncome?.id },
          { label: "Date", type: "date", value: currentIncome?.date },
          { label: "Name", type: "text", value: currentIncome?.name },
          { label: "Amount", type: "number", value: currentIncome?.amount },
        ]}
        action="Save"
        onSubmit={async (formData) => {
          await updateIncome(formData);
          setIncomes((prev) =>
            prev.map((income) =>
              String(income.id) === String(formData.get("id"))
                ? {
                    ...income,
                    date: formData.get("date") as string,
                    name: formData.get("name") as string,
                    amount: Number(formData.get("amount")),
                  }
                : income,
            ),
          );
        }}
      />
      <InputFormModal
        id="editExpenseModal"
        ref={editExpenseModal}
        title="Edit Expense"
        inputs={[
          { label: "Id", type: "hidden", value: currentExpense?.id },
          { label: "Date", type: "date", value: currentExpense?.date },
          { label: "Name", type: "text", value: currentExpense?.name },
          {
            label: "Budget",
            type: "select",
            options: budgets.map((budget) => ({
              name: budget.name,
              value: budget.id,
            })),
            value: currentExpense?.budget || budgets[0]?.id,
          },
          { label: "Amount", type: "number", value: currentExpense?.amount },
        ]}
        onSubmit={async (formData) => {
          await updateExpense(formData);
          setExpenses((prev) =>
            prev.map((expense) =>
              String(expense.id) === String(formData.get("id"))
                ? {
                    ...expense,
                    date: formData.get("date"),
                    name: formData.get("name"),
                    budget: formData.get("budget"),
                    amount: formData.get("amount"),
                  }
                : expense,
            ),
          );
        }}
        action="Save"
      />
      <InputFormModal
        id="deleteIncomeModal"
        ref={deleteIncomeModal}
        title="Delete Income?"
        inputs={[{ label: "Id", type: "hidden", value: currentIncome?.id }]}
        action="Delete"
        onSubmit={async (formData) => {
          await deleteIncome(formData);
          setIncomes((prev) =>
            prev.filter(
              (income) => String(income.id) !== String(formData.get("id")),
            ),
          );
        }}
      />
      <InputFormModal
        id="deleteExpenseModal"
        ref={deleteExpenseModal}
        title="Delete Expense?"
        inputs={[{ label: "Id", type: "hidden", value: currentExpense?.id }]}
        action="Delete"
        onSubmit={async (formData) => {
          await deleteExpense(formData);
          setExpenses((prev) =>
            prev.filter(
              (expense) => String(expense.id) !== String(formData.get("id")),
            ),
          );
        }}
      />
    </div>
  );
}

export default Transactions;
