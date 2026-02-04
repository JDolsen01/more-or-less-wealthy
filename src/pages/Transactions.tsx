import { useRef, useState, useEffect } from "react";
import InputFormModal, {
  handleEditOpenModal,
} from "../components/InputFormModal";
import Table from "../components/Table";
import { deleteIncome, getIncomes, updateIncome } from "../helpers/income";

const budgets = [
  "Subscription",
  "Housing",
  "Transportation",
  "Utilities",
  "Groceries",
  "Entertainment",
  "Food",
];

const expenses = [
  {
    date: "2024-01-10",
    name: "Groceries",
    budget: "Food",
    amount: 150,
  },
  {
    date: "2024-01-12",
    name: "Electricity Bill",
    budget: "Utilities",
    amount: 60,
  },
  {
    date: "2024-01-20",
    name: "Dining Out",
    budget: "Entertainment",
    amount: 80,
  },
];

function Transactions() {
  const [income, setIncome] = useState<Array<Record<string, any>>>([]);
  useEffect(() => {
    getIncomes().then((data) =>
      setIncome(
        data.map((item) => ({
          id: item.id,
          date: item.date,
          name: item.name,
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
              ...income,
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
          { label: "Id", type: "hidden", value: currentIncome?.id },
          { label: "Date", type: "date", value: currentIncome?.date },
          { label: "Name", type: "text", value: currentIncome?.name },
          { label: "Amount", type: "number", value: currentIncome?.amount },
        ]}
        action="Save"
        onSubmit={updateIncome}
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
            options: budgets,
            value: currentExpense?.budget || budgets[0],
          },
          { label: "Amount", type: "number", value: currentExpense?.amount },
        ]}
        action="Save"
      />
      <InputFormModal
        id="deleteIncomeModal"
        ref={deleteIncomeModal}
        title="Delete Income?"
        inputs={[{ label: "Id", type: "hidden", value: currentIncome?.id }]}
        action="Delete"
        onSubmit={deleteIncome}
      />
      <InputFormModal
        id="deleteExpenseModal"
        ref={deleteExpenseModal}
        title="Delete Expense?"
        inputs={[{ label: "Id", type: "hidden", value: currentExpense?.id }]}
        action="Delete"
      />
    </div>
  );
}

export default Transactions;
