import { useEffect, useRef, useState, type JSX } from "react";
import supabase from "../helper/supabaseClient";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Fab from "../components/Fab";

function Wrapper({ children }: { children: JSX.Element }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
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
                onClick: handleOpenModal,
              },
              {
                label: "Expense",
                icon: "inboxMinus",
                onClick: () => {},
              },
              {
                label: "Recurring",
                icon: "repeat",
                onClick: () => {},
              },
              {
                label: "Budget",
                icon: "dollar",
                onClick: () => {},
              },
            ]}
          >
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
              ref={modalRef}
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Add Income</h3>
                <p className="py-4">
                  Press ESC key or click the button below to close
                </p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </Fab>
          {children}
        </div>
      );
    }
    return <Navigate to="/login" replace />;
  }
}

export default Wrapper;
