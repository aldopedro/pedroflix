"use client";
import { useState } from "react";
import MovieModal from "./MovieModal"; // Hover trailer
import MovieDetailModal from "./MovieDetailModal"; // Modal completo
import styles from "./MovieCard.module.css";

export type Movie = {
  id: number;
  title: string;
  poster: string;
  overview: string;
  release_date: string;
  trailer?: string; // URL completa do YouTube
};

function extractTrailerKey(url: string) {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v") || "";
  } catch {
    return "";
  }
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const trailerKey = movie.trailer ? extractTrailerKey(movie.trailer) : "";

  return (
    <>
      <div
        className={styles.card}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        <img src={movie.poster} alt={movie.title} className={styles.thumbnail} />

        {!hovered && (
          <div className={styles.overlay}>
            <p className={styles.title}>{movie.title}</p>
            <p className={styles.release}>{movie.release_date}</p>
          </div>
        )}

        {hovered && trailerKey && <MovieModal trailerKey={trailerKey} />}
      </div>

      {modalOpen && trailerKey && (
        <MovieDetailModal
          movie={{ ...movie, trailerKey }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
