"use client";
import { useState } from "react";
import MovieModal from "./MovieModal";
import styles from "./MovieCard.module.css";

type Movie = {
  id: number;
  title: string;
  poster: string;
  overview: string;
  release_date: string;
  trailer?: string;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className={`${styles.card} ${hovered ? styles.cardHovered : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        {!hovered || !movie.trailer ? (
          <img src={movie.poster} alt={movie.title} className={styles.thumbnail} />
        ) : (
          <iframe
            src={movie.trailer}
            className={styles.video}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}

        <div className={styles.overlay}>
          <p className={styles.title}>{movie.title}</p>
          <p className={styles.release}>{movie.release_date}</p>
        </div>
      </div>

      {modalOpen && <MovieModal movie={movie} onClose={() => setModalOpen(false)} />}
    </>
  );
}
