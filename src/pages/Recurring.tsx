import { useRef, useState, useMemo, useEffect } from "react";
import InputFormModal, {
  handleEditOpenModal,
} from "../components/InputFormModal";
import Table from "../components/Table";
import FabModal from "../components/FabModal";
import { getBudgets, type Budget } from "../helpers/budget";

const reocurringExpenses = [
  {
    Due: "2026-01-01",
    Frequency: "Semiannually",
    Name: "Gym Membership",
    Budget: "Subscription",
    Amount: 50,
  },
  {
    Due: "2026-01-05",
    Frequency: "Monthly",
    Name: "Netflix Subscription",
    Budget: "Subscription",
    Amount: 15,
  },
  {
    Due: "2026-01-10",
    Frequency: "Monthly",
    Name: "Rent",
    Budget: "Housing",
    Amount: 1200,
  },
  {
    Due: "2026-01-15",
    Frequency: "Monthly",
    Name: "Car Payment",
    Budget: "Transportation",
    Amount: 300,
  },
  {
    Due: "2026-01-30",
    Frequency: "Monthly",
    Name: "Internet Bill",
    Budget: "Utilities",
    Amount: 60.23,
  },
];

function advanceDateByFrequency(dateStr: string, frequency: string): string {
  const date = new Date(dateStr);
  switch (frequency) {
    case "Weekly":
      date.setDate(date.getDate() + 7);
      break;
    case "Biweekly":
      date.setDate(date.getDate() + 14);
      break;
    case "Monthly":
      date.setMonth(date.getMonth() + 1);
      break;
    case "Bimonthly":
      date.setMonth(date.getMonth() + 2);
      break;
    case "Quarterly":
      date.setMonth(date.getMonth() + 3);
      break;
    case "Semiannually":
      date.setMonth(date.getMonth() + 6);
      break;
    case "Annually":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }
  return date.toISOString().split("T")[0];
}

function Recurring() {
  const pastDueExpenses = reocurringExpenses.filter(
    (exp) => new Date(exp.Due) < new Date(),
  );

  const editRecurringModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const deleteRecurringModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const completeRecurringModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );

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
  const [currentRecurring, setCurrentRecurring] = useState<Record<
    string,
    any
  > | null>(null);

  const nextDueDate = useMemo(
    () =>
      advanceDateByFrequency(
        currentRecurring?.Due || new Date().toISOString().split("T")[0],
        currentRecurring?.Frequency,
      ),
    [currentRecurring?.Due, currentRecurring?.Frequency],
  );

  return (
    <div className="flex flex-col items-center justify-start px-4">
      <h1 className="text-2xl font-bold mt-4">Recurring</h1>
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
            data={reocurringExpenses}
            actions={[
              {
                action: (row) =>
                  handleEditOpenModal(
                    completeRecurringModal,
                    row,
                    setCurrentRecurring,
                  ),
                type: "complete",
              },
              {
                action: (row) =>
                  handleEditOpenModal(
                    editRecurringModal,
                    row,
                    setCurrentRecurring,
                  ),
                type: "edit",
              },
              {
                action: (row) =>
                  handleEditOpenModal(
                    deleteRecurringModal,
                    row,
                    setCurrentRecurring,
                  ),
                type: "delete",
              },
            ]}
          />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Past Due"
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <Table
            data={pastDueExpenses}
            actions={[
              {
                action: (row) =>
                  handleEditOpenModal(
                    completeRecurringModal,
                    row,
                    setCurrentRecurring,
                  ),
                type: "complete",
              },
              {
                action: (row) =>
                  handleEditOpenModal(
                    editRecurringModal,
                    row,
                    setCurrentRecurring,
                  ),
                type: "edit",
              },
              {
                action: (row) =>
                  handleEditOpenModal(
                    deleteRecurringModal,
                    row,
                    setCurrentRecurring,
                  ),
                type: "delete",
              },
            ]}
          />
        </div>
      </div>
      <InputFormModal
        id="editRecurringModal"
        ref={editRecurringModal}
        title="Edit Recurring Expense"
        inputs={[
          { label: "Id", type: "hidden", value: currentRecurring?.Id },
          { label: "Due", type: "date", value: currentRecurring?.Due },
          {
            label: "Frequency",
            type: "select",
            value: currentRecurring?.Frequency || "Monthly",
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
          { label: "Name", type: "text", value: currentRecurring?.Name },
          {
            label: "Budget",
            type: "select",
            value: currentRecurring?.Budget || budgets[0]?.id,
            options: budgets.map((budget) => ({
              name: budget.name,
              value: budget.id,
            })),
          },
          { label: "Amount", type: "number", value: currentRecurring?.Amount },
        ]}
        action="Save"
      />
      <InputFormModal
        id="deleteRecurringModal"
        ref={deleteRecurringModal}
        title="Are you sure?"
        inputs={[{ label: "Id", type: "hidden", value: currentRecurring?.Id }]}
        action="Delete"
      />
      <InputFormModal
        id="completeRecurringModal"
        ref={completeRecurringModal}
        title="Complete Recurring Expense"
        inputs={[
          { label: "Id", type: "hidden", value: currentRecurring?.Id },
          {
            label: "Due",
            type: "hidden",
            value: nextDueDate,
          },
        ]}
        action="Complete"
      />
      <FabModal budgets={budgets} setBudgets={setBudgets} />
    </div>
  );
}
export default Recurring;
