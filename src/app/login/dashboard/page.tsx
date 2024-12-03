'use client'; 

import { redirect } from "next/navigation"
import { useState, useEffect } from "react";

async function fetchData() {
  const response = await fetch("http://localhost:8081/validate", {
    method: "GET",
    credentials: 'include', 
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const data = await response.json();  
    return data;  
  } else {
    console.log('Falha na requisição');
    return null;
  }
}

export default function Dashboard() {
 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Função que busca os dados
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData); 
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false); 
      }
    };

    getData();
  }, []);  

  if (loading) {
    return <div>Carregando...</div>; 
  }

  if (data) {
    return <div>Positivo</div>; 
  } else {
    return redirect("/login")
  }
}
