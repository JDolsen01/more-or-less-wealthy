import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>Home Page</div>
      <Link to="/signup">Signup</Link>
      <br></br>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Home;
