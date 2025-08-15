"use client";
import { useState } from "react";
import MovieModal from "./MovieModal"; // Hover trailer
import styles from "./MovieCard.module.css";

export type Movie = {
  id: number;
  title: string;
  poster: string;
  overview: string;
  release_date: string;
  trailerKey?: string; // só a key do YouTube
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={movie.poster} alt={movie.title} className={styles.thumbnail} />

      {!hovered && (
        <div className={styles.overlay}>
          <p className={styles.title}>{movie.title}</p>
          <p className={styles.release}>{movie.release_date}</p>
        </div>
      )}

      {hovered && movie.trailerKey && <MovieModal trailerKey={movie.trailerKey} />}
    </div>
  );
}
