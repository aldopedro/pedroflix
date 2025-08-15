"use client";
import { useState, useEffect } from "react";
import styles from "./MovieCard.module.css";

type Movie = {
  id: number;
  title: string;
  poster: string;
  overview: string;
  release_date: string;
  preview: string;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const [hovered, setHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (hovered && movie.preview) {
      timeout = setTimeout(() => setShowVideo(true), 500); // delay 500ms
    } else {
      setShowVideo(false);
    }
    return () => clearTimeout(timeout);
  }, [hovered, movie.preview]);

  return (
    <div
      className={`${styles.card} ${hovered ? styles.hovered : ""}`}
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
      <div className={styles.info}>
        <h4>{movie.title}</h4>
      </div>
    </div>
  );
}
