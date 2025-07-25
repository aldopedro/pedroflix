'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://pedroflix-api.onrender.com"
    : "http://localhost:8080";
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`${API_URL}/validate`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          setAuthorized(true);
        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error("Erro na validação", err);
        router.push('/login');
      }
    };

    validateToken();
  }, [router]);

  if (authorized === null) return <p>Carregando...</p>;

  return <>{children}</>;
}