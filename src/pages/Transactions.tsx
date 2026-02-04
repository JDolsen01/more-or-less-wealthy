import { useRef, useState } from "react";
import InputFormModal, {
  handleEditOpenModal,
} from "../components/InputFormModal";
import Table from "../components/Table";

const budgets = [
  "Subscription",
  "Housing",
  "Transportation",
  "Utilities",
  "Groceries",
  "Entertainment",
  "Food",
];

const income = [
  { Date: "2024-01-15", Name: "Salary", Amount: 3000 },
  { Date: "2024-01-30", Name: "Freelance Project", Amount: 800 },
];

const expenses = [
  {
    Date: "2024-01-10",
    Name: "Groceries",
    Budget: "Food",
    Amount: 150,
  },
  {
    Date: "2024-01-12",
    Name: "Electricity Bill",
    Budget: "Utilities",
    Amount: 60,
  },
  {
    Date: "2024-01-20",
    Name: "Dining Out",
    Budget: "Entertainment",
    Amount: 80,
  },
];

function Transactions() {
  const editIncomeModal = useRef<HTMLDialogElement | null>(null);
  const editExpenseModal = useRef<HTMLDialogElement | null>(null);
  const deleteIncomeModal = useRef<HTMLDialogElement | null>(null);
  const deleteExpenseModal = useRef<HTMLDialogElement | null>(null);
  const [currentIncome, setCurrentIncome] = useState<Record<
    string,
    any
  > | null>(null);
  const [currentExpense, setCurrentExpense] = useState<Record<
    string,
    any
  > | null>(null);
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
              ...income,
              ...expenses.map(({ Budget, ...rest }) => rest),
            ].sort((a, b) => (a.Date > b.Date ? 1 : -1))}
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
            data={income}
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
          { label: "Id", type: "hidden", value: currentIncome?.Id },
          { label: "Date", type: "date", value: currentIncome?.Date },
          { label: "Name", type: "text", value: currentIncome?.Name },
          { label: "Amount", type: "number", value: currentIncome?.Amount },
        ]}
        action="Save"
      />
      <InputFormModal
        id="editExpenseModal"
        ref={editExpenseModal}
        title="Edit Expense"
        inputs={[
          { label: "Id", type: "hidden", value: currentExpense?.Id },
          { label: "Date", type: "date", value: currentExpense?.Date },
          { label: "Name", type: "text", value: currentExpense?.Name },
          {
            label: "Budget",
            type: "select",
            options: budgets,
            value: currentExpense?.Budget || budgets[0],
          },
          { label: "Amount", type: "number", value: currentExpense?.Amount },
        ]}
        action="Save"
      />
      <InputFormModal
        id="deleteIncomeModal"
        ref={deleteIncomeModal}
        title="Delete Income?"
        inputs={[{ label: "Id", type: "hidden", value: currentIncome?.Id }]}
        action="Delete"
      />
      <InputFormModal
        id="deleteExpenseModal"
        ref={deleteExpenseModal}
        title="Delete Expense?"
        inputs={[{ label: "Id", type: "hidden", value: currentExpense?.Id }]}
        action="Delete"
      />
    </div>
  );
}

export default Transactions;
