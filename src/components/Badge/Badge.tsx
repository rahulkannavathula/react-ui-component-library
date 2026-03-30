import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children, dot = false, className }) => (
  <span className={`${styles.badge} ${styles[variant]} ${className ?? ''}`}>
    {dot && <span className={styles.dot} aria-hidden />}
    {children}
  </span>
);
