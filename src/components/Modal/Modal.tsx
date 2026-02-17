import React, { ReactNode, useEffect } from "react";
import { Button } from "../Button/Button";
import styles from "./Modal.module.css";

interface ModalAction {
  text: string;
  variant?: "primary" | "secondary" | "danger";
  onClick: () => void | Promise<void>;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ModalAction[];
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {showCloseButton && (
            <button
              className={styles.close}
              onClick={onClose}
              aria-label="Fechar"
            >
              ✕
            </button>
          )}
        </div>

        <div className={styles.content}>{children}</div>

        {actions && actions.length > 0 && (
          <div className={styles.footer}>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "primary"}
                onClick={action.onClick}
              >
                {action.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
