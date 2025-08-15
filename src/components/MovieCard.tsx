"use client";
import { useState } from "react";
import MovieModal from "./MovieModal"; // Hover modal
import MovieDetailModal from "./MovieDetailModal"; // Modal completo ao clicar
import styles from "./MovieCard.module.css";

export type Movie = {
  id: number;
  title: string;
  poster: string;
  overview: string;
  release_date: string;
  trailer?: string; // URL do YouTube embed
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className={styles.card}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        <img src={movie.poster} alt={movie.title} className={styles.thumbnail} />

        <div className={styles.overlay}>
          <p className={styles.title}>{movie.title}</p>
          <p className={styles.release}>{movie.release_date}</p>
        </div>

        {hovered && movie.trailer && <MovieModal movie={movie} />}
      </div>

      {modalOpen && <MovieDetailModal movie={movie} onClose={() => setModalOpen(false)} />}
    </>
  );
}
