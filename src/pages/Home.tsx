import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm fixed z-10">
        <div className="navbar-start">
          <Link className="btn btn-ghost text-xl" to="/">
            More || Less Wealthy
          </Link>
        </div>
        <div className="navbar-end">
          <Link className="btn" to="/signup">
            Signup
          </Link>
          <Link className="btn btn-primary ml-2" to="/login">
            Login
          </Link>
        </div>
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">More or Less Wealthy</h1>
            <p className="py-6">
              Because we are all <span className="font-extrabold">MORE</span> or{" "}
              <span className="font-extralight">less</span> wealthy. Some may
              need more help tracking expenses, and that is what we are here
              for.
            </p>
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className="m-8 lg:mx-16">
        <div className="flex w-full flex-col">
          <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
            Dashboard content
          </div>
          <div className="divider"></div>
          <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
            Transactions content
          </div>
          <div className="divider"></div>
          <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
            Reoccuring content
          </div>
          <div className="divider"></div>
          <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
            Budgets content
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
