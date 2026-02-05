import { useRef } from "react";
import Fab from "../components/Fab";
import InputFormModal, { handleOpenModal } from "../components/InputFormModal";
import { createIncome, getIncomes, type Income } from "../helpers/income";
import type { Expense } from "../helpers/expense";
import type { Recurring } from "../helpers/recurring";
import type { Budget } from "../helpers/budget";

interface FabModalProps {
  setIncomes?: React.Dispatch<React.SetStateAction<Income[]>>;
  setExpenses?: React.Dispatch<React.SetStateAction<Expense[]>>;
  setRecurrings?: React.Dispatch<React.SetStateAction<Recurring[]>>;
  setBudgets?: React.Dispatch<React.SetStateAction<Budget[]>>;
}

const budgets = [
  "Subscription",
  "Housing",
  "Transportation",
  "Utilities",
  "Groceries",
];

function FabModal({ setIncomes }: FabModalProps) {
  const incomeModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const expenseModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const recurringModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const budgetModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );

  return (
    <>
      <Fab
        className="mb-16 lg:mb-0"
        actions={[
          {
            label: "Income",
            icon: "inboxPlus",
            onClick: () => handleOpenModal(incomeModal),
          },
          {
            label: "Expense",
            icon: "inboxMinus",
            onClick: () => handleOpenModal(expenseModal),
          },
          {
            label: "Recurring",
            icon: "repeat",
            onClick: () => handleOpenModal(recurringModal),
          },
          {
            label: "Budget",
            icon: "dollar",
            onClick: () => handleOpenModal(budgetModal),
          },
        ]}
      />
      <InputFormModal
        id="incomeModal"
        ref={incomeModal}
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
        id="expenseModal"
        ref={expenseModal}
        title="Add Expense"
        inputs={[
          { label: "Date", type: "date" },
          { label: "Name", type: "text" },
          {
            label: "Budget",
            type: "select",
            value: budgets[0],
            options: budgets,
          },
          { label: "Amount", type: "number" },
        ]}
        action="Add"
      />
      <InputFormModal
        id="recurringModal"
        ref={recurringModal}
        title="Add Recurring"
        inputs={[
          { label: "Due", type: "date" },
          {
            label: "Frequency",
            type: "select",
            value: "Monthly",
            options: [
              "Weekly",
              "Biweekly",
              "Monthly",
              "Bimonthly",
              "Quarterly",
              "Semiannually",
              "Annually",
            ],
          },
          { label: "Name", type: "text" },
          {
            label: "Budget",
            type: "select",
            value: budgets[0],
            options: budgets,
          },

          { label: "Amount", type: "number" },
        ]}
        action="Add"
      />
      <InputFormModal
        id="budgetModal"
        ref={budgetModal}
        title="Add Budget"
        inputs={[
          { label: "Name", type: "text" },
          { label: "Budget", type: "number" },
        ]}
        action="Add"
      />
    </>
  );
}

export default FabModal;
