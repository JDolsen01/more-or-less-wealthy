import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Link className="btn btn-ghost text-xl" to="/">
            More || Less Wealthy
          </Link>
        </div>
        <div className="navbar-end">
          <Link className="btn" to="/login">
            Login
          </Link>
          <Link className="btn btn-primary ml-2" to="/signup">
            Signup
          </Link>
        </div>
      </div>
      <h1>Home Page</h1>
    </>
  );
}

export default Home;
