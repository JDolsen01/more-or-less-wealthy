import { useState } from "react";
import { supabase } from "../helper/supabaseClient";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
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
      <h2>Register</h2>
      <br></br>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        ></input>
        <br></br>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        ></input>
        <br></br>
        <button type="submit">Register</button>
        <br></br>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Register;
