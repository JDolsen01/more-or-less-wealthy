import { useState } from "react";
import supabase from "../helpers/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import NotificationBanner from "../components/NotificationBanner";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<Record<string, any> | undefined>(
    undefined,
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ type: "error", message: `Error: ${error.message}` });
      setEmail("");
      setPassword("");
      return;
    }

    if (data) {
      navigate("/dashboard");
      return null;
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm fixed">
        <Link className="btn btn-ghost text-xl" to="/">
          More || Less Wealthy
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="pb-4">Login Page</h2>
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
            <NotificationBanner
              type={message?.type}
              message={message?.message}
            />
            <div className="pt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="link">
                Sign Up
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Login;
