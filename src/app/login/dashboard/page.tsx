'use client'
import AuthGuard from "../../../components/AuthGuard";
async function logout() {
  const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://pedroflix-api.onrender.com"
    : "http://localhost:8080";
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.ok) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      const errorData = await response.json();
      console.error("Erro no logout:", errorData.message);
    }
  } catch (error) {
    console.error("Erro durante o logout:", error);
  }
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
