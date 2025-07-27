'use client'
import AuthGuard from "../../../components/AuthGuard";
function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <div>
        Bem Vindo
        <button onClick={logout}>Sair</button>
      </div>
    </AuthGuard>
  )
}
