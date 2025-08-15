"use client";
import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster: string;
  overview: string;
  release_date: string;
  preview?: string;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/popular`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMovies(data);
        else setMovies([]);
      })
      .catch(console.error);
  }, []);

  return (
    <main
      style={{
        display: "flex",
        gap: "16px",
        overflowX: "auto",
        padding: "20px",
        scrollBehavior: "smooth",
        background: "linear-gradient(180deg, #141414 0%, #000 100%)",
        minHeight: "100vh",
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </main>
  );
}
