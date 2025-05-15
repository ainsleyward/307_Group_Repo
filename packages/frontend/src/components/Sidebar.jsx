// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

function Sidebar({ userId }) {
  return (
    <div style={{
      width: "150px",
      height: "100vh",
      color: "black",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>
      <h2>Woofer</h2>
      <Link to={`/dashboard/${userId}`}>Dashboard</Link>
      <Link to={`/find?userId=${userId}`}>Find pups</Link>
      <Link to={`/mates?userId=${userId}`}>Mates</Link>
      <Link to={`/profile?userId=${userId}`}>Profile</Link>
      <Link to="/">Log out</Link>
    </div>
  );
}

export default Sidebar;

