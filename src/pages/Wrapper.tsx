import { useEffect, useState, type JSX } from "react";
import supabase from "../helper/supabaseClient";
import { Navigate } from "react-router-dom";

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
      return children;
    }
    return <Navigate to="/login" replace />;
  }
}

export default Wrapper;
