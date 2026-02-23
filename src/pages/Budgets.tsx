import { useEffect, useRef, useState } from "react";
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
  getBudgetTotalsByTerm,
} from "../helpers/budget";
import Icon from "../components/Icon";
import { getTermLabel, type Terms } from "../helpers/terms";

function Budgets() {
  const [termLabel, setTermLabel] = useState<string>("");
  const [currentTerm, setCurrentTerm] = useState<Terms>("month");
  const [termFactor, setTermFactor] = useState<number>(1);
  const [page, setPage] = useState<number>(0);

  const [currentBudget, setCurrentBudget] = useState<Record<string, any>>({});
  const [budgets, setBudgets] = useState<Array<Budget>>([]);
  const [spent, setSpent] = useState<Record<string, number>>({});
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

  useEffect(() => {
    setTermLabel(getTermLabel(currentTerm, page));
    getBudgetTotalsByTerm(currentTerm, page).then((data) => {
      setSpent(data);
    });
    switch (currentTerm) {
      case "month":
        setTermFactor(1);
        break;
      case "quarter":
        setTermFactor(3);
        break;
      case "year":
        setTermFactor(12);
        break;
    }
  }, [currentTerm, page]);

  const addBudgetModal = useRef<HTMLDialogElement>(
    null as unknown as HTMLDialogElement,
  );
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
          {termLabel}
        </h1>
        <div className="tabs tabs-box w-full grid md:grid-none grid-cols-3 md:w-fit place-self-center col-span-3 order-last md:order-none md:col-span-1">
          <input
            type="radio"
            name="time-frame"
            className="tab w-full text-center"
            aria-label="Month"
            onClick={() => {
              setCurrentTerm("month");
              setPage(0);
            }}
            defaultChecked
          />
          <input
            type="radio"
            name="time-frame"
            className="tab w-full text-center"
            aria-label="Quarter"
            onClick={() => {
              setCurrentTerm("quarter");
              setPage(0);
            }}
          />
          <input
            type="radio"
            name="time-frame"
            className="tab w-full text-center"
            aria-label="Year"
            onClick={() => {
              setCurrentTerm("year");
              setPage(0);
            }}
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
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map((budget) => (
              <div
                key={budget.id}
                className="card w-full bg-base-100 card-sm shadow-sm"
              >
                <div className="card-body">
                  <div className="flex justify-between">
                    <h2 className="card-title">{budget.name}</h2>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-circle btn-xs"
                      >
                        <Icon type="dots" />
                      </div>
                      <ul
                        tabIndex={-1}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-fit p-2 mt-1 shadow-sm"
                      >
                        <li>
                          <a
                            onClick={() =>
                              handleEditOpenModal(
                                editBudgetModal,
                                budget,
                                setCurrentBudget,
                              )
                            }
                          >
                            <Icon type="edit" />
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() =>
                              handleEditOpenModal(
                                deleteBudgetModal,
                                budget,
                                setCurrentBudget,
                              )
                            }
                          >
                            <Icon type="delete" />
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div
                      className="radial-progress text-primary ml-2"
                      style={
                        {
                          "--value":
                            ((spent[budget.id] || 0) /
                              (budget.amount * termFactor)) *
                              100 || 0,
                        } as React.CSSProperties
                      }
                      aria-valuenow={70}
                      role="progressbar"
                    >
                      {(
                        ((spent[budget.id] || 0) /
                          (budget.amount * termFactor)) *
                          100 || 0
                      ).toFixed(0)}
                      %
                    </div>
                    <div className="mr-2n">
                      <p className="text-base font-semibold">
                        ${(budget.amount * termFactor).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Spent: ${spent[budget.id] || 0}
                      </p>
                      <p className="text-xs text-gray-500">
                        Remaining: $
                        {(budget.amount - (spent[budget.id] || 0)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Overspent"
        />
        <div className="tab-content border-base-300 bg-base-100 p-4">
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets
              .filter((budget) => spent[budget.id] > budget.amount * termFactor)
              .map((budget) => (
                <div
                  key={budget.id}
                  className="card w-full bg-base-100 card-sm shadow-sm"
                >
                  <div className="card-body">
                    <div className="flex justify-between">
                      <h2 className="card-title">{budget.name}</h2>
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-circle btn-xs"
                        >
                          <Icon type="dots" />
                        </div>
                        <ul
                          tabIndex={-1}
                          className="dropdown-content menu bg-base-100 rounded-box z-1 w-fit p-2 mt-1 shadow-sm"
                        >
                          <li>
                            <a
                              onClick={() =>
                                handleEditOpenModal(
                                  editBudgetModal,
                                  budget,
                                  setCurrentBudget,
                                )
                              }
                            >
                              <Icon type="edit" />
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() =>
                                handleEditOpenModal(
                                  deleteBudgetModal,
                                  budget,
                                  setCurrentBudget,
                                )
                              }
                            >
                              <Icon type="delete" />
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div
                        className="radial-progress text-primary ml-2"
                        style={
                          {
                            "--value":
                              ((spent[budget.id] || 0) /
                                (budget.amount * termFactor)) *
                                100 || 0,
                          } as React.CSSProperties
                        }
                        aria-valuenow={70}
                        role="progressbar"
                      >
                        {(
                          ((spent[budget.id] || 0) /
                            (budget.amount * termFactor)) *
                            100 || 0
                        ).toFixed(0)}
                        %
                      </div>
                      <div className="mr-2n">
                        <p className="text-base font-semibold">
                          ${(budget.amount * termFactor).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Spent: ${spent[budget.id] || 0}
                        </p>
                        <p className="text-xs text-gray-500">
                          Remaining: $
                          {(budget.amount - (spent[budget.id] || 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <span className="mt-2 w-full flex justify-center">
        <div className="join grid grid-cols-2 w-fit">
          <button
            className="join-item btn btn-outline"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            className="join-item btn btn-outline"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </span>
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
                    amount: Number(formData.get("amount")),
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
