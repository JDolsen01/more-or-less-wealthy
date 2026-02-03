import { useEffect, useRef, useState, type JSX } from "react";
import supabase from "../helpers/supabaseClient";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Fab from "../components/Fab";

function Wrapper({ children }: { children: JSX.Element }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const incomeModal = useRef<HTMLDialogElement>(null);
  const expenseModal = useRef<HTMLDialogElement>(null);
  const recurringModal = useRef<HTMLDialogElement>(null);
  const budgetModal = useRef<HTMLDialogElement>(null);

  const handleOpenModal = (
    modalType: "income" | "expense" | "recurring" | "budget",
  ) => {
    const modals = {
      income: incomeModal,
      expense: expenseModal,
      recurring: recurringModal,
      budget: budgetModal,
    };

    if (modals[modalType].current) {
      modals[modalType].current.showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };
    getSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (authenticated) {
      return (
        <div>
          <Navbar
            links={[
              {
                name: "Dashboard",
                path: "/dashboard",
                icon: "chart",
              },
              {
                name: "Transactions",
                path: "/transactions",
                icon: "inbox",
              },
              {
                name: "Recurring",
                path: "/recurring",
                icon: "repeat",
              },
              {
                name: "Budgets",
                path: "/budgets",
                icon: "dollar",
              },
            ]}
          />
          <Fab
            className="mb-16 lg:mb-0"
            actions={[
              {
                label: "Income",
                icon: "inboxPlus",
                onClick: () => handleOpenModal("income"),
              },
              {
                label: "Expense",
                icon: "inboxMinus",
                onClick: () => handleOpenModal("expense"),
              },
              {
                label: "Recurring",
                icon: "repeat",
                onClick: () => handleOpenModal("recurring"),
              },
              {
                label: "Budget",
                icon: "dollar",
                onClick: () => handleOpenModal("budget"),
              },
            ]}
          />
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
            ref={incomeModal}
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-2">Add Income</h3>
              <form>
                <label className="floating-label">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-md mb-4 w-full"
                  />
                </label>
                <label className="input mb-4 w-full">
                  <span className="label">Date</span>
                  <input type="date" />
                </label>
                <label className="floating-label">
                  <span>Amount</span>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="input input-md mb-4 w-full"
                  />
                </label>
                <span className="flex gap-2">
                  <button className="btn flex-auto">Cancel</button>
                  <button className="btn btn-primary flex-auto">Add</button>
                </span>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
            ref={expenseModal}
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-2">Add Expense</h3>
              <form>
                <label className="floating-label">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-md mb-4 w-full"
                  />
                </label>
                <label className="input mb-4 w-full">
                  <span className="label">Date</span>
                  <input type="date" />
                </label>
                <label className="floating-label">
                  <span>Amount</span>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="input input-md mb-4 w-full"
                  />
                </label>
                <span className="flex gap-4">
                  <button className="btn flex-auto">Cancel</button>
                  <button className="btn btn-primary flex-auto">Add</button>
                </span>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
            ref={recurringModal}
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-2">Add Recurring</h3>
              <form>
                <label className="floating-label">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-md mb-4 w-full"
                  />
                </label>
                <label className="input mb-4 w-full">
                  <span className="label">Start Date</span>
                  <input type="date" />
                </label>
                <label className="select mb-4 w-full">
                  <span className="label">Frequency</span>
                  <select defaultValue="Monthly" className="select">
                    <option>Weekly</option>
                    <option>Biweekly</option>
                    <option>Monthly</option>
                    <option>Bimonthly</option>
                    <option>Quarterly</option>
                    <option>Semiannually</option>
                    <option>Annually</option>
                  </select>
                </label>
                <label className="floating-label">
                  <span>Amount</span>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="input input-md mb-4 w-full"
                  />
                </label>
                <span className="flex gap-4">
                  <button className="btn flex-auto">Cancel</button>
                  <button className="btn btn-primary flex-auto">Add</button>
                </span>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
            ref={budgetModal}
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-2">Add Budget</h3>
              <form>
                <label className="floating-label">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-md mb-4 w-full"
                  />
                </label>
                <label className="floating-label">
                  <span>Amount</span>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="input input-md mb-4 w-full"
                  />
                </label>
                <span className="flex gap-4">
                  <button className="btn flex-auto">Cancel</button>
                  <button className="btn btn-primary flex-auto">Add</button>
                </span>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {children}
        </div>
      );
    }
    return <Navigate to="/login" replace />;
  }
}

export default Wrapper;
