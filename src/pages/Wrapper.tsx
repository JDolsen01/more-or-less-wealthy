import { useEffect, useState, type JSX } from "react";
import supabase from "../helper/supabaseClient";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Wrapper({ children }: { children: JSX.Element }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
                icon: "list",
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
          {children}
        </div>
      );
    }
    return <Navigate to="/login" replace />;
  }
}

export default Wrapper;
