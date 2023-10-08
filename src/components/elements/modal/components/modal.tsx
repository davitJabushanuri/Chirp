/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
"use client";
import { motion } from "framer-motion";
import React, { useCallback, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./styles/modal.module.scss";

export const Modal = ({
  children,
  onClose,
  closeOnBackdropClick = true,
  background,
  minViewportWidth = null,
  maxViewportWidth = null,
  disableScroll = false,
  focusOnElement = null,
  focusAfterClose = null,
}: {
  children: React.ReactNode;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
  background?: string;
  minViewportWidth?: number | null;
  maxViewportWidth?: number | null;
  disableScroll?: boolean;
  focusOnElement?: string | null;
  focusAfterClose?: string | null;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab") {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = Array.from(
          modal.querySelectorAll(
            'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',
          ),
        );
        const firstFocusableElement = focusableElements[0] as HTMLElement;
        const lastFocusableElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

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
    },
    [onClose],
  );

  const handleScroll = useCallback(
    (e: Event) => {
      if (disableScroll) {
        e.preventDefault();
      }
    },
    [disableScroll],
  );

  const handleDisplay = useCallback(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const viewportWidth = window.innerWidth;

    if (
      (minViewportWidth && viewportWidth < minViewportWidth) ||
      (maxViewportWidth && viewportWidth > maxViewportWidth)
    ) {
      onClose();
    }
  }, [onClose, minViewportWidth, maxViewportWidth]);

  useLayoutEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = Array.from(
      modal.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',
      ),
    );
    const firstFocusableElement = focusableElements?.[0] as HTMLElement;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    modal?.addEventListener("keydown", handleKeyDown);
    if (focusOnElement) {
      const elementToFocus = modal.querySelector(focusOnElement) as HTMLElement;
      elementToFocus?.focus();
    } else {
      firstFocusableElement?.focus();
    }

    if (disableScroll) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "11px";
      window.addEventListener("scroll", handleScroll);
    }

    if (minViewportWidth || maxViewportWidth) {
      handleDisplay();
    }

    return () => {
      modal?.removeEventListener("keydown", handleKeyDown);
      if (focusAfterClose) {
        const elementToFocus = document.querySelector(
          focusAfterClose,
        ) as HTMLElement;
        elementToFocus?.focus();
      } else {
        previouslyFocusedElementRef.current?.focus();
      }

      if (disableScroll) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [
    onClose,
    disableScroll,
    handleKeyDown,
    handleScroll,
    handleDisplay,
    minViewportWidth,
    maxViewportWidth,
    focusOnElement,
    focusAfterClose,
  ]);

  const backdropStyle: React.CSSProperties = {
    backgroundColor:
      background === "none" ? "transparent" : "var(--clr-modal-background)",
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        e.stopPropagation();
        if (e.currentTarget === e.target && closeOnBackdropClick) onClose();
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      ref={modalRef}
      className={`${styles.container}`}
      style={backdropStyle}
      id="dialog"
      role="dialog"
      aria-modal="true"
    >
      {children}
    </motion.div>,
    document.body,
  );
};
