import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  UserIcon,
  PlusIcon,
  ExternalLinkIcon,
  LogOutIcon,
  ChevronDownIcon,
} from "./CareerIcons";

interface AdminHeaderProps {
  adminEmail: string;
  adminName?: string;
  onOpenNewModal: () => void;
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  adminEmail,
  adminName = "Saanvi Admin",
  onOpenNewModal,
  onLogout,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside and Escape key listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileOpen]);

  // Derive initial for avatar circle (e.g. "S" or "A")
  const initial = adminName ? adminName.charAt(0).toUpperCase() : (adminEmail ? adminEmail.charAt(0).toUpperCase() : "A");

  return (
    <header className="admin-header-card">
      <div className="admin-header-titles">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "4px" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "#94a3b8" }}>
            Saanvi Recruitment Portal
          </span>
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: "700", margin: "2px 0 4px", color: "#ffffff", letterSpacing: "-0.3px" }}>
          Careers Management Portal
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: 1.4 }}>
          Post open positions, update requirements, and manage live job listings
        </p>
      </div>

      <div className="admin-header-actions">
        {/* Post a New Role Button */}
        <button 
          onClick={onOpenNewModal} 
          className="btn-apply" 
          style={{ 
            background: "#f98e55", 
            padding: "8px 16px", 
            height: "38px", 
            borderRadius: "8px", 
            fontSize: "13px", 
            fontWeight: "600",
            display: "inline-flex", 
            alignItems: "center", 
            gap: "6px",
            border: "none",
            cursor: "pointer",
            color: "#ffffff"
          }}
        >
          <PlusIcon size={15} />
          <span>Post a New Role</span>
        </button>

        {/* View Live Careers Button */}
        <Link 
          href="/careers" 
          target="_blank" 
          className="btn-details" 
          style={{ 
            background: "rgba(255, 255, 255, 0.08)", 
            color: "#f8fafc", 
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "8px 14px", 
            height: "38px", 
            borderRadius: "8px", 
            fontSize: "13px", 
            fontWeight: "500",
            display: "inline-flex", 
            alignItems: "center", 
            gap: "6px",
            textDecoration: "none"
          }}
        >
          <span>View Live Careers</span>
          <ExternalLinkIcon size={14} />
        </Link>

        {/* PROFILE DROPDOWN MENU */}
        <div className="profile-dropdown-container" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen(prev => !prev)}
            className={`profile-trigger-btn ${isProfileOpen ? "active" : ""}`}
            title="Account Menu"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            <div className="profile-avatar-circle">
              {initial}
            </div>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#f8fafc" }}>
              {adminName}
            </span>
            <span 
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                color: "#cbd5e1",
                transform: isProfileOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.15s ease" 
              }}
            >
              <ChevronDownIcon size={13} />
            </span>
          </button>

          {isProfileOpen && (
            <div className="profile-dropdown-menu" role="menu">
              {/* User Email & Identity Header */}
              <div className="profile-menu-header">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                  <div className="profile-menu-name" style={{ color: "#0f172a", fontWeight: "600", fontSize: "14px" }}>
                    {adminName || "Saanvi Admin"}
                  </div>
                  <span style={{ background: "rgba(249, 142, 85, 0.12)", color: "#f98e55", padding: "1px 6px", borderRadius: "999px", fontSize: "10px", fontWeight: "700" }}>
                    Admin
                  </span>
                </div>
                <div className="profile-menu-email">{adminEmail}</div>
              </div>



              {/* Sign Out Action Item */}
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  onLogout();
                }}
                className="profile-menu-item logout"
                role="menuitem"
              >
                <LogOutIcon size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
