import { useEffect, useRef, useState, type JSX } from "react";
import supabase from "../helpers/supabaseClient";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Fab from "../components/Fab";
import InputFormModal from "../components/InputFormModal";

function Wrapper({ children }: { children: JSX.Element }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const incomeModal = useRef<HTMLDialogElement>(null);
  const expenseModal = useRef<HTMLDialogElement>(null);
  const recurringModal = useRef<HTMLDialogElement>(null);
  const budgetModal = useRef<HTMLDialogElement>(null);

  const handleOpenModal = (
    modalRef: React.RefObject<HTMLDialogElement | null>,
  ) => {
    if (modalRef.current) {
      modalRef.current.showModal();
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
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-xl text-primary"></span>
      </div>
    );
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
              { label: "Name", type: "text" },
              { label: "Date", type: "date" },
              { label: "Amount", type: "number" },
            ]}
          />
          <InputFormModal
            id="expenseModal"
            ref={expenseModal}
            title="Add Expense"
            inputs={[
              { label: "Name", type: "text" },
              { label: "Date", type: "date" },
              { label: "Amount", type: "number" },
            ]}
          />
          <InputFormModal
            id="recurringModal"
            ref={recurringModal}
            title="Add Recurring"
            inputs={[
              { label: "Name", type: "text" },
              { label: "Due", type: "date" },
              { label: "Frequency", type: "frequency", value: "Monthly" },
              { label: "Amount", type: "number" },
            ]}
          />
          <InputFormModal
            id="budgetModal"
            ref={budgetModal}
            title="Add Budget"
            inputs={[
              { label: "Name", type: "text" },
              { label: "Amount", type: "number" },
            ]}
          />
          {children}
        </div>
      );
    }
    return <Navigate to="/login" replace />;
  }
}

export default Wrapper;
