"use client";
import { useState, useEffect } from "react";
import styles from "./MovieCard.module.css";

type Movie = {
  id: number;
  title: string;
  poster: string;
  overview: string;
  release_date: string;
  preview?: string; // URL do trailer ou vídeo
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const [hovered, setHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (hovered && movie.preview) {
      timeout = setTimeout(() => setShowVideo(true), 500); // delay do hover
    } else {
      setShowVideo(false);
    }
    return () => clearTimeout(timeout);
  }, [hovered, movie.preview]);

  return (
    <div
      className={`${styles.card} ${hovered ? styles.cardHovered : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!showVideo ? (
        <img src={movie.poster} alt={movie.title} className={styles.thumbnail} />
      ) : (
        <iframe
          src={movie.preview}
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
  );
}
