import { useState } from "react";
import supabase from "../helpers/supabaseClient";
import { Link } from "react-router-dom";
import NotificationBanner from "../components/NotificationBanner";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<Record<string, any> | undefined>(
    undefined,
  );

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ type: "error", message: "Passwords do not match" });
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage({ type: "error", message: `Error: ${error.message}` });
      return;
    }
    if (data) {
      setMessage({
        type: "success",
        message:
          "Registration successful! Please check your email to confirm your account.",
      });
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
        <h2 className="text-2xl font-bold pb-4">Welcome!</h2>
        <form onSubmit={handleSignup}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Sign Up</legend>
            <label className="floating-label">
              <span>Email</span>
              <input
                type="email"
                className="input mb-4"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="floating-label">
              <span>Password</span>
              <input
                type="password"
                className="input mb-4"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label className="floating-label">
              <span>Confirm Password</span>
              <input
                type="password"
                className="input mb-4"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            <button className="btn btn-neutral" type="submit">
              Sign Up
            </button>
            <div className="pt-4">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Login
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
      <NotificationBanner type={message?.type} message={message?.message} />
    </div>
  );
}

export default Signup;
