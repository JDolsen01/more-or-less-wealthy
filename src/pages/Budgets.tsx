import { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import InputFormModal, {
  handleEditOpenModal,
} from "../components/InputFormModal";
import {
  getBudgets,
  updateBudget,
  deleteBudget,
  type Budget,
} from "../helpers/budget";
import FabModal from "../components/FabModal";

function Budgets() {
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
  const [currentBudget, setCurrentBudget] = useState<Record<string, any>>({});

  const editBudgetModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
  const deleteBudgetModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );

  return (
    <div className="flex flex-col items-center justify-start px-4">
      <h1 className="text-2xl font-bold mt-4">Budgets</h1>
      <div className="tabs tabs-border w-full max-w-4xl mt-4">
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
            data={budgets.filter((b) => b.budget > b.budget)}
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
        id="editBudgetModal"
        ref={editBudgetModal}
        title="Edit Budget"
        inputs={[
          { label: "Id", type: "hidden", value: currentBudget?.id },
          { label: "Name", type: "text", value: currentBudget?.name },
          { label: "Budget", type: "number", value: currentBudget?.budget },
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
      <FabModal setBudgets={setBudgets} />
    </div>
  );
}

export default Budgets;
