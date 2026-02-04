import { useRef, useState } from "react";
import InputFormModal, {
  handleEditOpenModal,
} from "../components/InputFormModal";
import Table from "../components/Table";
import { getIncome, updateIncome } from "../helpers/income";

const budgets = [
  "Subscription",
  "Housing",
  "Transportation",
  "Utilities",
  "Groceries",
  "Entertainment",
  "Food",
];

const initialIncome = await getIncome().then((data) =>
  data.map((item) => ({
    Id: item.id,
    Date: item.date,
    Name: item.name,
    Amount: item.amount,
  })),
);

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
  const [income, setIncome] =
    useState<Array<Record<string, any>>>(initialIncome);

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
        onSubmit={updateIncome}
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
