import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    fetch("http://localhost:3000/api/v1/auth/logout")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push("/login");
      });
  };
  logout();
  router.push("/login");
  return null;
}
