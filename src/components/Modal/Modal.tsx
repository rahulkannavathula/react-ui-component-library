import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: ModalSize;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdrop?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, size = 'md', children, footer, closeOnBackdrop = true }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement as HTMLElement;
      dialogRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      prevFocusRef.current?.focus();
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleKey = useCallback((e: React.KeyboardEvent) => { if (e.key === 'Escape') onClose(); }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={closeOnBackdrop ? onClose : undefined} role="presentation">
      <div ref={dialogRef} className={`${styles.dialog} ${styles[size]}`}
        role="dialog" aria-modal="true" aria-labelledby="modal-title"
        tabIndex={-1} onClick={(e) => e.stopPropagation()} onKeyDown={handleKey}>
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">&times;</button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  );
};
