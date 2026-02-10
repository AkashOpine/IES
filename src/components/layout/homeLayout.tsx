import { Navigate, Outlet } from "react-router-dom";
//import { useAuth } from "../../hooks/useAuth";

export const HomeLayout = () => {
  const user = false;

  if (user) {
    return <Navigate to="/dashboard/profile" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
