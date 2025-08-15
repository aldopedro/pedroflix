"use client";
import { Movie } from "./MovieCard";
import styles from "./MovieDetailModal.module.css";

type MovieDetailModalProps = {
  movie: Movie & { trailerKey?: string };
  onClose: () => void;
};

export default function MovieDetailModal({ movie, onClose }: MovieDetailModalProps) {
  if (!movie.trailerKey) return null;

  const embedUrl = `https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0`;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <iframe
          src={embedUrl}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className={styles.video}
        />
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
