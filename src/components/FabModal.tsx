import { useRef } from "react";
import Fab from "../components/Fab";
import InputFormModal, { handleOpenModal } from "../components/InputFormModal";
import { createIncome, getIncomes, type Income } from "../helpers/income";
import { createExpense, getExpenses, type Expense } from "../helpers/expense";
import type { Recurring } from "../helpers/recurring";
import { createBudget, getBudgets, type Budget } from "../helpers/budget";

interface FabModalProps {
  setIncomes?: React.Dispatch<React.SetStateAction<Income[]>>;
  setExpenses?: React.Dispatch<React.SetStateAction<Expense[]>>;
  setRecurrings?: React.Dispatch<React.SetStateAction<Recurring[]>>;
  budgets: Budget[];
  setBudgets?: React.Dispatch<React.SetStateAction<Budget[]>>;
}

function FabModal({
  setIncomes,
  setExpenses,
  budgets,
  setBudgets,
}: FabModalProps) {
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
              { name: "Weekly", value: "weekly" },
              { name: "Biweekly", value: "biweekly" },
              { name: "Monthly", value: "monthly" },
              { name: "Bimonthly", value: "bimonthly" },
              { name: "Quarterly", value: "quarterly" },
              { name: "Semiannually", value: "semiannually" },
              { name: "Annually", value: "annually" },
            ],
          },
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
        onSubmit={async (formData) => {
          await createBudget(formData);
          if (setBudgets) {
            const budgets = await getBudgets();
            const mapped = budgets.map((item) => ({
              id: item.id,
              name: item.name,
              budget: item.budget,
            }));
            setBudgets(mapped);
          }
        }}
      />
    </>
  );
}

export default FabModal;
