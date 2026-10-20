"use client";

import React, { useEffect } from "react";

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  itemName?: string;
  itemType?: string;
  message?: string;
  warningText?: string;
  confirmText?: string;
  cancelText?: string;
  isDeleting?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
  dangerLevel?: "danger" | "warning";
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title = "Confirm Deletion",
  itemName,
  itemType = "item",
  message,
  warningText,
  confirmText = "Delete",
  cancelText = "Cancel",
  isDeleting = false,
  onConfirm,
  onClose,
  dangerLevel = "danger",
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDeleting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen) return null;

  const isDanger = dangerLevel === "danger";
  const accentColor = isDanger ? "#ef4444" : "#f59e0b";
  const accentBg = isDanger ? "#fef2f2" : "#fffbeb";
  const accentBorder = isDanger ? "#fee2e2" : "#fef3c7";
  const btnHoverBg = isDanger ? "#dc2626" : "#d97706";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={e => {
        if (e.target === e.currentTarget && !isDeleting) {
          onClose();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "deleteModalFadeIn 0.18s ease-out",
      }}
    >
      <style>{`
        @keyframes deleteModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes deleteModalPopIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes deleteSpinner {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "460px",
          boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.08)",
          overflow: "hidden",
          animation: "deleteModalPopIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
          boxSizing: "border-box",
        }}
      >
        {/* Header with Icon and Close Button */}
        <div
          style={{
            padding: "24px 24px 16px",
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
          }}
        >
          {/* Danger / Warning Icon badge */}
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: accentBg,
              border: `1px solid ${accentBorder}`,
              color: accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {isDanger ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            )}
          </div>

          {/* Title & Close */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3
                id="delete-modal-title"
                style={{
                  margin: 0,
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#0f172a",
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                disabled={isDeleting}
                aria-label="Close modal"
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#94a3b8",
                  cursor: isDeleting ? "not-allowed" : "pointer",
                  padding: "4px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={e => {
                  if (!isDeleting) {
                    e.currentTarget.style.color = "#1e293b";
                    e.currentTarget.style.background = "#f1f5f9";
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "#94a3b8";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Description / Message */}
            <p
              style={{
                margin: "8px 0 0",
                fontSize: "14px",
                lineHeight: 1.5,
                color: "#64748b",
              }}
            >
              {message || (
                <>
                  Are you sure you want to permanently delete this {itemType}?
                </>
              )}
            </p>
          </div>
        </div>

        {/* Item Preview Callout if itemName provided */}
        {itemName && (
          <div style={{ padding: "0 24px 16px" }}>
            <div
              style={{
                padding: "10px 14px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1e293b",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={itemName}
              >
                {itemName}
              </span>
            </div>
          </div>
        )}

        {/* Warning Callout Note (Optional) */}
        {warningText && (
          <div style={{ padding: "0 24px 16px" }}>
            <div
              style={{
                padding: "8px 12px",
                background: accentBg,
                border: `1px solid ${accentBorder}`,
                borderRadius: "8px",
                fontSize: "12px",
                color: isDanger ? "#991b1b" : "#92400e",
                lineHeight: 1.4,
              }}
            >
              <strong>Warning:</strong> {warningText}
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div
          style={{
            padding: "16px 24px",
            background: "#fafbfc",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            style={{
              padding: "9px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#475569",
              background: "#ffffff",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              cursor: isDeleting ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={e => {
              if (!isDeleting) {
                e.currentTarget.style.background = "#f1f5f9";
                e.currentTarget.style.color = "#0f172a";
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color = "#475569";
            }}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={() => onConfirm()}
            disabled={isDeleting}
            style={{
              padding: "9px 18px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#ffffff",
              background: accentColor,
              border: "none",
              borderRadius: "8px",
              cursor: isDeleting ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.15s ease",
              boxShadow: isDanger
                ? "0 1px 2px rgba(239, 68, 68, 0.2)"
                : "0 1px 2px rgba(245, 158, 11, 0.2)",
            }}
            onMouseEnter={e => {
              if (!isDeleting) e.currentTarget.style.background = btnHoverBg;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = accentColor;
            }}
          >
            {isDeleting && (
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  borderTopColor: "#ffffff",
                  borderRadius: "50%",
                  animation: "deleteSpinner 0.7s linear infinite",
                  display: "inline-block",
                }}
              />
            )}
            <span>{isDeleting ? "Deleting..." : confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
