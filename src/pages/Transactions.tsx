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
          budget: item.budget,
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
      <h1 className="text-2xl font-bold mt-4">Transactions</h1>
      <div className="tabs tabs-border w-full max-w-4xl">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="All"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
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
                    amout: formData.get("amount"),
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
