import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>Home Page</div>
      <Link to="/register">Register</Link>
      <br></br>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Home;
