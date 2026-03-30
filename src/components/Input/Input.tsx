import React, { forwardRef, useId } from 'react';
import styles from './Input.module.css';

export type InputState = 'default' | 'error' | 'success';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  helperText?: string;
  state?: InputState;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, state = 'default', leftAddon, rightAddon, className, required, ...rest }, ref) => {
    const id = useId();
    const helperId = `${id}-helper`;
    return (
      <div className={`${styles.wrapper} ${className ?? ''}`}>
        <label htmlFor={id} className={styles.label}>
          {label}{required && <span className={styles.required} aria-label="required">*</span>}
        </label>
        <div className={`${styles.inputWrapper} ${styles[state]}`}>
          {leftAddon && <span className={styles.addon} aria-hidden>{leftAddon}</span>}
          <input ref={ref} id={id} className={styles.input}
            aria-describedby={helperText ? helperId : undefined}
            aria-invalid={state === 'error'} required={required} {...rest} />
          {rightAddon && <span className={styles.addon} aria-hidden>{rightAddon}</span>}
        </div>
        {helperText && (
          <p id={helperId} className={`${styles.helper} ${styles[`helper_${state}`]}`}
            role={state === 'error' ? 'alert' : undefined}>{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
