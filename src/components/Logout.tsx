import { Navigate, useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    fetch("http://localhost:3000/api/v1/auth/logout")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/login");
      });
  };
  logout();
  return <Navigate to={"/login"} />;
}
