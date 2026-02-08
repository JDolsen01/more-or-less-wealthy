import { useRef, useState, useEffect } from "react";
import InputFormModal, {
  handleEditOpenModal,
} from "../components/InputFormModal";
import Table from "../components/Table";
import {
  deleteIncome,
  getIncomes,
  updateIncome,
  type Income,
} from "../helpers/income";
import FabModal from "../components/FabModal";
import { type Budget, getBudgets } from "../helpers/budget";
import {
  deleteExpense,
  getExpenses,
  updateExpense,
  type Expense,
} from "../helpers/expense";
import BarChart from "../components/BarChart";

function Transactions() {
  const [incomes, setIncomes] = useState<Array<Income>>([]);
  useEffect(() => {
    getIncomes().then((data) =>
      setIncomes(
        data.map((item) => ({
          id: item.id,
          date: item.date,
          name: item.name,
          amount: item.amount,
        })),
      ),
    );
  }, []);
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
  const [expenses, setExpenses] = useState<Array<Expense>>([]);
  useEffect(() => {
    getExpenses().then((data) =>
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
  }, []);
  const [currentIncome, setCurrentIncome] = useState<Record<string, any>>({});
  const [currentExpense, setCurrentExpense] = useState<Record<string, any>>({});

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
        <div className="text-2xl font-bold my-auto col-span-2 md:col-span-1">
          Oct. - Dec. 2026
        </div>
        <div className="tabs tabs-box w-full grid md:grid-none grid-cols-3 md:w-fit place-self-center col-span-3 order-first md:order-none md:col-span-1">
          <input
            type="radio"
            name="time-frame"
            className="tab"
            aria-label="Month"
            defaultChecked
          />
          <input
            type="radio"
            name="time-frame"
            className="tab"
            aria-label="Quarter"
          />
          <input
            type="radio"
            name="time-frame"
            className="tab"
            aria-label="Year"
          />
        </div>
        <button className="btn btn-primary my-auto w-fit place-self-end">
          Add
        </button>
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
                value: [
                  23, 120, 30, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                ],
              },
              {
                key: "Expense",
                value: [
                  4, 10, 80, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                  17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                ],
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
                value: [
                  23, 120, 30, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                ],
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
          aria-label="Expense"
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <BarChart
            data={[
              {
                key: "Expense",
                value: [
                  4, 10, 80, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                  17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                ],
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
          <button className="join-item btn btn-outline">Previous</button>
          <button className="join-item btn btn-outline">Next</button>
        </div>
      </span>
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
      <FabModal
        setIncomes={setIncomes}
        setExpenses={setExpenses}
        budgets={budgets}
        setBudgets={setBudgets}
      />
    </div>
  );
}

export default Transactions;
