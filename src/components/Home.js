import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <h2>Take your time</h2>
      <div className="action">
        <p>We are born to be happy. Not to race with other people on everything we do.</p>
        <button onClick={() => navigate("/todos")}>Get started</button>
      </div>
    </div>
  );
};

export default Home;
