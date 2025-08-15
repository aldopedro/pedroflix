"use client";
import styles from "./MovieModal.module.css";

type Movie = {
  id: number;
  title: string;
  poster: string;
  overview: string;
  release_date: string;
  preview?: string;
};

export default function MovieModal({
  movie,
  onClose,
}: {
  movie: Movie;
  onClose: () => void;
}) {
  if (!movie) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {movie.preview && (
          <iframe
            src={movie.preview}
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
