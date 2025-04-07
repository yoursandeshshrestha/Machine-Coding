"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import FocusTrap from "focus-trap-react";
import { XIcon } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined" || !isOpen) return null;

  return createPortal(
    <FocusTrap>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-sm p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="relative bg-white rounded-md p-8 w-full max-w-lg shadow-2xl border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            onClick={onClose}
            aria-label="Close modal"
          >
            <XIcon size={22} />
          </button>
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </FocusTrap>,
    document.body
  );
}
