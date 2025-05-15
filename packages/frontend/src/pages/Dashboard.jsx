// src/pages/Dashboard.jsx
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const dogId = searchParams.get("dogId");

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let url = `http://localhost:8000/dashboard/${userId}`;
    if (dogId) url += `?dogId=${dogId}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error);
          });
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message));
  }, [userId, dogId]);

  if (error) return <DashboardLayout><div>Error: {error}</div></DashboardLayout>;
  if (!data) return <DashboardLayout><div>Loading...</div></DashboardLayout>;

  const dog = data.currentDog;

  return (
    <DashboardLayout userId={userId}>
      <h1>Welcome back, {data.userName}</h1>
      <h2>Pawfect pups for {dog.name}</h2>
  
      {data.matches.map((match) => (
        <div key={match._id}>
          <img src={match.image} alt={match.name} width="150" />
          <h3>{match.name}</h3>
          <p>{match.breed}</p>
          <p>{match.tags.join(", ")}</p>
        </div>
      ))}
    </DashboardLayout>
  );
  
}

export default Dashboard;