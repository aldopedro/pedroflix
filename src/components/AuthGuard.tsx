"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setValid(false);
      return;
    }

    fetch("https://pedroflix-api.onrender.com/validate", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setValid(true);
        } else {
          localStorage.removeItem("token");
          setValid(false);
        }
      })
      .catch(() => {
        setValid(false);
      });
  }, []);

  useEffect(() => {
    if (valid === false) {
      router.push("/login");
    }
  }, [valid]);

  if (valid === null) {
    return <p>Verificando autenticação...</p>;
  }

  return <>{children}</>;
}