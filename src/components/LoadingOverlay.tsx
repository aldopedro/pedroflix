import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./LoadingOverlay.module.css";

type LoadingOverlayProps = {
  loading: boolean;
};

export default function LoadingOverlay({ loading }: LoadingOverlayProps) {
  if (!loading) return null;

  return (
    <div className={styles.loadingOverlay}>
      <ClipLoader size={60} color="#e50914" />
    </div>
  );
}