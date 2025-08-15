"use client";
import { useState, useEffect, useRef } from "react";
import MovieModal from "./MovieModal";
import styles from "./MovieCard.module.css";

type Movie = {
  id: number;
  title: string;
  poster: string;
  overview: string;
  release_date: string;
  preview?: string; // URL do trailer
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (hovered && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [hovered]);

  return (
    <>
      <div
        className={`${styles.card} ${hovered ? styles.cardHovered : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        {!hovered || !movie.preview ? (
          <img src={movie.poster} alt={movie.title} className={styles.thumbnail} />
        ) : (
          <video
            ref={videoRef}
            src={movie.preview}
            className={styles.video}
            muted
            loop
          />
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
