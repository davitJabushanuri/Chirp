/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./styles/modal.module.scss";

export const Modal = ({
  children,
  onClose,
  closeOnBackdropClick = true,
  style,
  background,
  minViewportWidth = null,
  maxViewportWidth = null,
  disableScroll = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
  style?: React.CSSProperties;
  background?: string;
  minViewportWidth?: number | null;
  maxViewportWidth?: number | null;
  disableScroll?: boolean;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    const focusableElements = modal?.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
    );
    const firstFocusableElement = focusableElements?.[0] as HTMLElement;
    const lastFocusableElement = focusableElements?.[
      focusableElements.length - 1
    ] as HTMLElement;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    firstFocusableElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    modal?.addEventListener("keydown", handleKeyDown);

    const handleScroll = (e: Event) => {
      if (disableScroll) {
        e.preventDefault();
      }
    };

    if (disableScroll) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "11px";
      window.addEventListener("scroll", handleScroll);
    }

    const handleDisplay = () => {
      const viewportWidth = window.innerWidth;

      if (
        (minViewportWidth && viewportWidth < minViewportWidth) ||
        (maxViewportWidth && viewportWidth > maxViewportWidth)
      ) {
        onClose();
      }
    };

    if (minViewportWidth || maxViewportWidth) {
      window.addEventListener("resize", handleDisplay);
    }

    return () => {
      modal?.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElementRef.current?.focus();

      if (disableScroll) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        window.removeEventListener("scroll", handleScroll);
      }

      if (minViewportWidth || maxViewportWidth) {
        window.removeEventListener("resize", handleDisplay);
      }
    };
  }, [onClose, disableScroll, minViewportWidth, maxViewportWidth]);

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    ...style,
  };

  const backdropStyle: React.CSSProperties = {
    backgroundColor:
      background === "none" ? "transparent" : "var(--clr-modal-background)",
  };

  return createPortal(
    <div
      onClick={closeOnBackdropClick ? onClose : undefined}
      className={styles.backdrop}
      style={backdropStyle}
    >
      <div
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        className={`${styles.modal} `}
        id="dialog"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
