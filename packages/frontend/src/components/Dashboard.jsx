import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/dashboard/${userId}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error || "Fetch failed");
          });
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message));
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  const dog = data.selectedDog;

  return (
    <div>
      <h1>Welcome back, {data.userName}</h1>
      <h3>Match Suggestions</h3>
      {data.matches.length === 0 ? (
        <p>No matches yet</p>
      ) : (
        <ul>
          {data.matches.map((match) => (
            <li key={match._id}>
              <p>{match.name} ({match.breed})</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;


