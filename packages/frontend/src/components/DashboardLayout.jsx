// src/components/DashboardLayout.jsx
import Sidebar from "./Sidebar";

function DashboardLayout({ userId, children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar userId={userId} />
      <div style={{ flex: 1, padding: "2rem" }}>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
