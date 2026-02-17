import React, { ReactNode } from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullscreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  fullscreen = false,
}) => {
  const classNames = [
    styles.spinner,
    styles[size],
    fullscreen && styles.fullscreen,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      role="status"
      aria-label="Carregando"
    />
  );
};

interface LoadingOverlayProps {
  children?: ReactNode;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ children }) => {
  return (
    <div className={styles.overlay}>
      {children || <LoadingSpinner size="lg" />}
    </div>
  );
};
