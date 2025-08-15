"use client";
import { Movie } from "./MovieCard";
import styles from "./MovieDetailModal.module.css";

type MovieDetailModalProps = {
  movie: Movie;
  onClose: () => void;
};

export default function MovieDetailModal({ movie, onClose }: MovieDetailModalProps) {
  if (!movie) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
          <p className={styles.overview}>{movie.overview}</p>
          <button className={styles.close} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
