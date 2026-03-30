import React, { forwardRef } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, fullWidth = false, leftIcon, rightIcon, children, disabled, className, ...rest }, ref) => {
    const cls = [styles.btn, styles[variant], styles[size], fullWidth && styles.fullWidth, loading && styles.loading, className].filter(Boolean).join(' ');
    return (
      <button ref={ref} className={cls} disabled={disabled || loading} aria-busy={loading} aria-disabled={disabled || loading} {...rest}>
        {loading && <span className={styles.spinner} role="status" aria-label="Loading" />}
        {!loading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = 'Button';
