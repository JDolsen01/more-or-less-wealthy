import { useRef, useState, useMemo, useEffect } from "react";
import InputFormModal, {
  handleEditOpenModal,
  handleOpenModal,
} from "../components/InputFormModal";
import Table from "../components/Table";
import { getBudgets, type Budget } from "../helpers/budget";
import {
  completeRecurring,
  createRecurring,
  deleteRecurring,
  getRecurrings,
  updateRecurring,
  type Recurring,
} from "../helpers/recurring";
import Icon from "../components/Icon";

function advanceDateByFrequency(dateStr: string, frequency: string): string {
  if (!dateStr || !frequency) return dateStr;
  // Parse as local date to avoid timezone issues
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  switch (frequency.toLowerCase()) {
    case "weekly":
      date.setDate(date.getDate() + 7);
      break;
    case "biweekly":
      date.setDate(date.getDate() + 14);
      break;
    case "monthly":
      date.setMonth(date.getMonth() + 1);
      break;
    case "bimonthly":
      date.setMonth(date.getMonth() + 2);
      break;
    case "quarterly":
      date.setMonth(date.getMonth() + 3);
      break;
    case "semiannually":
      date.setMonth(date.getMonth() + 6);
      break;
    case "annually":
      date.setFullYear(date.getFullYear() + 1);
      break;
  }
  // Format as YYYY-MM-DD without timezone conversion
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function Recurrings() {
  const addRecurringModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
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

  const [recurrings, setRecurrings] = useState<Array<Recurring>>([]);
  useEffect(() => {
    getRecurrings().then((data) =>
      setRecurrings(
        data.map((item) => ({
          id: item.id,
          due: item.due,
          frequency: item.frequency,
          name: item.name,
          budget: item.budget,
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
          amount: item.amount,
        })),
      ),
    );
  }, []);
  const [currentRecurring, setCurrentRecurring] = useState<Record<
    string,
    any
  > | null>(null);
  const pastDueExpenses = recurrings.filter(
    (exp) => new Date(exp.due) < new Date(),
  );

  const nextDueDate = useMemo(
    () =>
      advanceDateByFrequency(
        currentRecurring?.due || new Date().toISOString().split("T")[0],
        currentRecurring?.frequency,
      ),
    [currentRecurring?.due, currentRecurring?.frequency],
  );

  return (
    <div className="flex flex-col items-center justify-start px-4">
      <div className="mt-4 mb-2 w-full h-12 max-w-4xl flex items-center justify-between">
        <h1 className="text-2xl font-bold my-auto">Recurring</h1>
        <button
          className="btn btn-primary"
          onClick={() => handleOpenModal(addRecurringModal)}
        >
          <Icon type="plus" /> Add
        </button>
      </div>
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
            data={recurrings}
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
        id="addRecurringModal"
        ref={addRecurringModal}
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
        onSubmit={async (formData) => {
          await createRecurring(formData);
          if (setRecurrings) {
            const recurrings = await getRecurrings();
            const mapped = recurrings.map((item) => ({
              id: item.id,
              due: item.due,
              frequency: item.frequency,
              name: item.name,
              budget: item.budget,
              amount: item.amount,
            }));
            setRecurrings(mapped);
          }
        }}
      />
      <InputFormModal
        id="editRecurringModal"
        ref={editRecurringModal}
        title="Edit Recurring Expense"
        inputs={[
          { label: "Id", type: "hidden", value: currentRecurring?.id },
          { label: "Due", type: "date", value: currentRecurring?.due },
          {
            label: "Frequency",
            type: "select",
            value: currentRecurring?.frequency || "Monthly",
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
          { label: "Name", type: "text", value: currentRecurring?.name },
          {
            label: "Budget",
            type: "select",
            value: currentRecurring?.budget || budgets[0]?.id,
            options: budgets.map((budget) => ({
              name: budget.name,
              value: budget.id,
            })),
          },
          { label: "Amount", type: "number", value: currentRecurring?.amount },
        ]}
        action="Save"
        onSubmit={async (formData) => {
          await updateRecurring(formData);
          setRecurrings((prev) =>
            prev.map((recurr) =>
              String(recurr.id) === String(formData.get("id"))
                ? {
                    ...recurr,
                    due: formData.get("due"),
                    frequency: formData.get("frequency"),
                    name: formData.get("name"),
                    budget: formData.get("budget"),
                    amount: formData.get("amount"),
                  }
                : recurr,
            ),
          );
        }}
      />
      <InputFormModal
        id="deleteRecurringModal"
        ref={deleteRecurringModal}
        title="Are you sure?"
        inputs={[{ label: "Id", type: "hidden", value: currentRecurring?.id }]}
        action="Delete"
        onSubmit={async (formData) => {
          await deleteRecurring(formData);
          setRecurrings((prev) =>
            prev.filter(
              (recurr) => String(recurr.id) !== String(formData.get("id")),
            ),
          );
        }}
      />
      <InputFormModal
        id="completeRecurringModal"
        ref={completeRecurringModal}
        title="Complete Recurring Expense"
        inputs={[
          { label: "Id", type: "hidden", value: currentRecurring?.id },
          { label: "Due", type: "hidden", value: currentRecurring?.due },
          { label: "nextdue", type: "hidden", value: nextDueDate },
          {
            label: "frequency",
            type: "hidden",
            value: currentRecurring?.frequency,
          },
          { label: "Name", type: "hidden", value: currentRecurring?.name },
          { label: "Budget", type: "hidden", value: currentRecurring?.budget },
          { label: "Amount", type: "hidden", value: currentRecurring?.amount },
        ]}
        action="Complete"
        onSubmit={async (formData) => {
          await completeRecurring(formData);
          setRecurrings((prev) =>
            prev.map((recurr) =>
              String(recurr.id) === String(formData.get("id"))
                ? {
                    ...recurr,
                    due: formData.get("nextdue"),
                    frequency: formData.get("frequency"),
                    name: formData.get("name"),
                    budget: formData.get("budget"),
                    amount: formData.get("amount"),
                  }
                : recurr,
            ),
          );
        }}
      />
    </div>
  );
}
export default Recurrings;
