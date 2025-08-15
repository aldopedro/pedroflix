"use client";
import { Movie } from "./MovieCard";
import styles from "./MovieModal.module.css";

type MovieModalProps = {
  movie: Movie;
};

export default function MovieModal({ movie }: MovieModalProps) {
  if (!movie.trailer) return null;
  const embedUrl = `${movie.trailer}&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${movie.trailer.split("/").pop()}`;

  return (
    <div className={styles.hoverModal}>
      <iframe
        src={embedUrl}
        className={styles.video}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
}
