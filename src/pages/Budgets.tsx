import { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import InputFormModal, {
  handleEditOpenModal,
  handleOpenModal,
} from "../components/InputFormModal";
import {
  getBudgets,
  updateBudget,
  deleteBudget,
  type Budget,
  createBudget,
} from "../helpers/budget";
import Icon from "../components/Icon";

function Budgets() {
  const addBudgetModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );

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
  const [currentBudget, setCurrentBudget] = useState<Record<string, any>>({});

  const editBudgetModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const deleteBudgetModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );

  return (
    <div className="flex flex-col items-center justify-start px-4">
      <div className="mt-4 w-full max-w-4xl grid grid-cols-3 gap-4">
        <h1 className="text-2xl font-bold my-auto col-span-2 md:col-span-1">
          Budgets
        </h1>
        <div className="tabs tabs-box w-full grid md:grid-none grid-cols-3 md:w-fit place-self-center col-span-3 order-last md:order-none md:col-span-1">
          <input
            type="radio"
            name="time-frame"
            className="tab w-full text-center"
            aria-label="Month"
            defaultChecked
          />
          <input
            type="radio"
            name="time-frame"
            className="tab w-full text-center"
            aria-label="Quarter"
          />
          <input
            type="radio"
            name="time-frame"
            className="tab w-full text-center"
            aria-label="Year"
          />
        </div>
        <button
          className="btn btn-primary my-auto w-fit place-self-end"
          onClick={() => handleOpenModal(addBudgetModal)}
        >
          <Icon type="plus" /> Add
        </button>
      </div>
      <div className="tabs tabs-border w-full max-w-4xl mt-2">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="All"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <Table
            data={budgets}
            actions={[
              {
                action: (row) =>
                  handleEditOpenModal(editBudgetModal, row, setCurrentBudget),
                type: "edit",
              },
              {
                action: (row) =>
                  handleEditOpenModal(deleteBudgetModal, row, setCurrentBudget),
                type: "delete",
              },
            ]}
          />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Overspent"
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <Table
            data={budgets.filter((b) => b.amount > b.amount)}
            actions={[
              {
                action: (row) =>
                  handleEditOpenModal(editBudgetModal, row, setCurrentBudget),
                type: "edit",
              },
              {
                action: (row) =>
                  handleEditOpenModal(deleteBudgetModal, row, setCurrentBudget),
                type: "delete",
              },
            ]}
          />
        </div>
      </div>
      <InputFormModal
        id="addBudgetModal"
        ref={addBudgetModal}
        title="Add Budget"
        inputs={[
          { label: "Name", type: "text" },
          { label: "Amount", type: "number" },
        ]}
        action="Add"
        onSubmit={async (formData) => {
          await createBudget(formData);
          if (setBudgets) {
            const budgets = await getBudgets();
            const mapped = budgets.map((item) => ({
              id: item.id,
              name: item.name,
              amount: item.amount,
            }));
            setBudgets(mapped);
          }
        }}
      />
      <InputFormModal
        id="editBudgetModal"
        ref={editBudgetModal}
        title="Edit Budget"
        inputs={[
          { label: "Id", type: "hidden", value: currentBudget?.id },
          { label: "Name", type: "text", value: currentBudget?.name },
          { label: "Amount", type: "number", value: currentBudget?.amount },
        ]}
        action="Save"
        onSubmit={async (formData) => {
          await updateBudget(formData);
          setBudgets((prev) =>
            prev.map((budget) =>
              String(budget.id) === String(formData.get("id"))
                ? {
                    ...budget,
                    name: formData.get("name") as string,
                    budget: Number(formData.get("budget")),
                  }
                : budget,
            ),
          );
        }}
      />
      <InputFormModal
        id="deleteBudgetModal"
        ref={deleteBudgetModal}
        title="Delete Budget?"
        inputs={[{ label: "Id", type: "hidden", value: currentBudget?.id }]}
        action="Delete"
        onSubmit={async (formData) => {
          await deleteBudget(formData);
          setBudgets((prev) =>
            prev.filter(
              (budget) => String(budget.id) !== String(formData.get("id")),
            ),
          );
        }}
      />
    </div>
  );
}

export default Budgets;
