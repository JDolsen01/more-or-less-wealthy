import { useRef, useState } from "react";
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
    Due: "01-01-2026",
    Frequency: "Semiannually",
    Name: "Gym Membership",
    Budget: "Subscription",
    Amount: "50",
  },
  {
    Due: "01-05-2026",
    Frequency: "Monthly",
    Name: "Netflix Subscription",
    Budget: "Subscription",
    Amount: "15",
  },
  {
    Due: "01-10-2026",
    Frequency: "Monthly",
    Name: "Rent",
    Budget: "Housing",
    Amount: "1200",
  },
  {
    Due: "01-15-2026",
    Frequency: "Monthly",
    Name: "Car Payment",
    Budget: "Transportation",
    Amount: "300",
  },
  {
    Due: "01-30-2026",
    Frequency: "Monthly",
    Name: "Internet Bill",
    Budget: "Utilities",
    Amount: "60",
  },
];

function Recurring() {
  const pastDueExpenses = reocurringExpenses.filter(
    (exp) => new Date(exp.Due) < new Date(),
  );

  const editRecurringModal = useRef<HTMLDialogElement>(null);
  const [currentRow, setCurrentRow] = useState<Record<string, any> | null>(
    null,
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
                action: (row) => handleOpenModal(editRecurringModal, row),
                type: "edit",
              },
              { type: "delete" },
              { type: "complete" },
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
                action: (row) => handleOpenModal(editRecurringModal, row),
                type: "edit",
              },
              { type: "delete" },
              { type: "complete" },
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
    </div>
  );
}
export default Recurring;
