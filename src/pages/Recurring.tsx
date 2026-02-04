import { useRef, useState, useMemo } from "react";
import InputFormModal from "../components/InputFormModal";
import Table from "../components/Table";

const budgets = [
  "Subscription",
  "Housing",
  "Transportation",
  "Utilities",
  "Groceries",
];

const reocurringExpenses = [
  {
    Due: "2026-01-01",
    Frequency: "Semiannually",
    Name: "Gym Membership",
    Budget: "Subscription",
    Amount: "50",
  },
  {
    Due: "2026-01-05",
    Frequency: "Monthly",
    Name: "Netflix Subscription",
    Budget: "Subscription",
    Amount: "15",
  },
  {
    Due: "2026-01-10",
    Frequency: "Monthly",
    Name: "Rent",
    Budget: "Housing",
    Amount: "1200",
  },
  {
    Due: "2026-01-15",
    Frequency: "Monthly",
    Name: "Car Payment",
    Budget: "Transportation",
    Amount: "300",
  },
  {
    Due: "2026-01-30",
    Frequency: "Monthly",
    Name: "Internet Bill",
    Budget: "Utilities",
    Amount: "60",
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
  console.log(date.toISOString().split("T")[0]);
  return date.toISOString().split("T")[0];
}

function Recurring() {
  const pastDueExpenses = reocurringExpenses.filter(
    (exp) => new Date(exp.Due) < new Date(),
  );

  const editRecurringModal = useRef<HTMLDialogElement>(null);
  const deleteRecurringModal = useRef<HTMLDialogElement>(null);
  const completeRecurringModal = useRef<HTMLDialogElement>(null);
  const [currentRow, setCurrentRow] = useState<Record<string, any> | null>(
    null,
  );

  const nextDueDate = useMemo(
    () =>
      advanceDateByFrequency(
        currentRow?.Due || new Date().toISOString().split("T")[0],
        currentRow?.Frequency,
      ),
    [currentRow?.Due, currentRow?.Frequency],
  );

  const handleOpenModal = (
    modalRef: React.RefObject<HTMLDialogElement | null>,
    row: Record<string, any>,
  ) => {
    setCurrentRow(row);
    if (modalRef.current) {
      modalRef.current.showModal();
    } else {
      console.error("Modal element not found");
    }
  };

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
                action: (row) => handleOpenModal(completeRecurringModal, row),
                type: "complete",
              },
              {
                action: (row) => handleOpenModal(editRecurringModal, row),
                type: "edit",
              },
              {
                action: (row) => handleOpenModal(deleteRecurringModal, row),
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
                action: (row) => handleOpenModal(completeRecurringModal, row),
                type: "complete",
              },
              {
                action: (row) => handleOpenModal(editRecurringModal, row),
                type: "edit",
              },
              {
                action: (row) => handleOpenModal(deleteRecurringModal, row),
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
          { label: "Id", type: "hidden", value: currentRow?.Id },
          { label: "Name", type: "text", value: currentRow?.Name },
          {
            label: "Budget",
            type: "select",
            value: currentRow?.Budget || budgets[0],
            options: budgets,
          },
          { label: "Due", type: "date", value: currentRow?.Due },
          {
            label: "Frequency",
            type: "select",
            value: currentRow?.Frequency || "Monthly",
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
          { label: "Amount", type: "number", value: currentRow?.Amount },
        ]}
        action="Save"
      />
      <InputFormModal
        id="deleteRecurringModal"
        ref={deleteRecurringModal}
        title="Are you sure?"
        inputs={[{ label: "Id", type: "hidden", value: currentRow?.Id }]}
        action="Delete"
      />
      <InputFormModal
        id="completeRecurringModal"
        ref={completeRecurringModal}
        title="Complete Recurring Expense"
        inputs={[
          { label: "Id", type: "hidden", value: currentRow?.Id },
          {
            label: "Due",
            type: "hidden",
            value: nextDueDate,
          },
        ]}
        action="Complete"
      />
    </div>
  );
}
export default Recurring;
