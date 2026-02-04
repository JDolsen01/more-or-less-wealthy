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
  const [currentRow, setCurrentRow] = useState<Record<string, any> | null>(
    null,
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
                  handleEditOpenModal(editIncomeModal, row, setCurrentRow),
                type: "edit",
              },
              {
                action: (row) =>
                  handleEditOpenModal(deleteIncomeModal, row, setCurrentRow),
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
                  handleEditOpenModal(editExpenseModal, row, setCurrentRow),
                type: "edit",
              },
              {
                action: (row) =>
                  handleEditOpenModal(deleteExpenseModal, row, setCurrentRow),
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
          { label: "Id", type: "hidden", value: currentRow?.Id },
          { label: "Date", type: "date", value: currentRow?.Date },
          { label: "Name", type: "text", value: currentRow?.Name },
          { label: "Amount", type: "number", value: currentRow?.Amount },
        ]}
        action="Save"
      />
      <InputFormModal
        id="editExpenseModal"
        ref={editExpenseModal}
        title="Edit Expense"
        inputs={[
          { label: "Id", type: "hidden", value: currentRow?.Id },
          { label: "Date", type: "date", value: currentRow?.Date },
          { label: "Name", type: "text", value: currentRow?.Name },
          {
            label: "Budget",
            type: "select",
            options: budgets,
            value: currentRow?.Budget || budgets[0],
          },
          { label: "Amount", type: "number", value: currentRow?.Amount },
        ]}
        action="Save"
      />
      <InputFormModal
        id="deleteIncomeModal"
        ref={deleteIncomeModal}
        title="Delete Income?"
        inputs={[{ label: "Id", type: "hidden", value: currentRow?.Id }]}
        action="Delete"
      />
      <InputFormModal
        id="deleteExpenseModal"
        ref={deleteExpenseModal}
        title="Delete Expense?"
        inputs={[{ label: "Id", type: "hidden", value: currentRow?.Id }]}
        action="Delete"
      />
    </div>
  );
}

export default Transactions;
