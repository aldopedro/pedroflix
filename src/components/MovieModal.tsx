"use client";
import styles from "./MovieModal.module.css";

type MovieModalProps = {
  trailerKey: string;
};

export default function MovieModal({ trailerKey }: MovieModalProps) {
  const embedUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${trailerKey}`;

  return (
    <div className={styles.hoverModal}>
      <iframe
        src={embedUrl}
        className={styles.video}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
