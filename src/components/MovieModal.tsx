"use client";
import { Movie } from "./MovieCard";
import styles from "./MovieModal.module.css";

type MovieModalProps = {
  movie: Movie;
};

export default function MovieModal({ movie }: MovieModalProps) {
  return (
    <div className={styles.hoverModal}>
      {movie.trailer && (
        <iframe
          src={movie.trailer}
          className={styles.video}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
      <div className={styles.info}>
        <h2>{movie.title}</h2>
        <p className={styles.release}>{movie.release_date}</p>
      </div>
    </div>
  );
}
