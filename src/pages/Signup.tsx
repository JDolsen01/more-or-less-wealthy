import { useState } from "react";
import supabase from "../helper/supabaseClient";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
      return;
    }

    if (data) {
      setMessage(
        "Registration successful! Please check your email to confirm your account."
      );
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm fixed">
        <Link className="btn btn-ghost text-xl" to="/">
          More || Less Wealthy
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="pb-4">Signup</h2>
        <form onSubmit={handleSignup}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Signup</legend>

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

            <button className="btn btn-neutral mt-4" type="submit">
              Signup
            </button>
            {message && (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{message}</span>
              </div>
            )}
            <div className="pt-4">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Login
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Signup;
