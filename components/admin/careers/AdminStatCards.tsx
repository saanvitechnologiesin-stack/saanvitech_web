import React from "react";
import { BriefcaseIcon, CheckCircleIcon, FileTextIcon, PauseCircleIcon } from "./CareerIcons";
import { CareerStatus } from "@/types/career";

interface AdminStatCardsProps {
  totalCount: number;
  publishedCount: number;
  draftCount: number;
  pausedCount: number;
  activeStatusTab?: "all" | CareerStatus;
  onSelectTab?: (tab: "all" | CareerStatus) => void;
}

export const AdminStatCards: React.FC<AdminStatCardsProps> = ({
  totalCount,
  publishedCount,
  draftCount,
  pausedCount,
  onSelectTab,
}) => {
  return (
    <section className="admin-stats-grid" aria-label="Recruitment Overview Statistics">
      {/* Total Roles */}
      <div 
        className="saas-stat-card"
        onClick={() => onSelectTab?.("all")}
        style={{ cursor: "pointer" }}
      >
        <div className="saas-stat-icon" style={{ background: "rgba(249, 142, 85, 0.12)", color: "#f98e55" }}>
          <BriefcaseIcon size={22} />
        </div>
        <div>
          <div className="saas-stat-val">{totalCount}</div>
          <div className="saas-stat-title">Total Roles</div>
          <div className="saas-stat-sub">All positions created</div>
        </div>
      </div>

      {/* Published Roles */}
      <div 
        className="saas-stat-card"
        onClick={() => onSelectTab?.("published")}
        style={{ cursor: "pointer" }}
      >
        <div className="saas-stat-icon" style={{ background: "#ecfdf5", color: "#059669" }}>
          <CheckCircleIcon size={22} />
        </div>
        <div>
          <div className="saas-stat-val" style={{ color: "#059669" }}>{publishedCount}</div>
          <div className="saas-stat-title">Published Roles</div>
          <div className="saas-stat-sub">Live on careers page</div>
        </div>
      </div>

      {/* Draft Roles */}
      <div 
        className="saas-stat-card"
        onClick={() => onSelectTab?.("draft")}
        style={{ cursor: "pointer" }}
      >
        <div className="saas-stat-icon" style={{ background: "#fffbeb", color: "#d97706" }}>
          <FileTextIcon size={22} />
        </div>
        <div>
          <div className="saas-stat-val" style={{ color: "#d97706" }}>{draftCount}</div>
          <div className="saas-stat-title">Draft Roles</div>
          <div className="saas-stat-sub">Internal / in preparation</div>
        </div>
      </div>

      {/* Paused Roles */}
      <div 
        className="saas-stat-card"
        onClick={() => onSelectTab?.("paused")}
        style={{ cursor: "pointer" }}
      >
        <div className="saas-stat-icon" style={{ background: "#f1f5f9", color: "#475569" }}>
          <PauseCircleIcon size={22} />
        </div>
        <div>
          <div className="saas-stat-val" style={{ color: "#475569" }}>{pausedCount}</div>
          <div className="saas-stat-title">Paused Roles</div>
          <div className="saas-stat-sub">Applications on hold</div>
        </div>
      </div>
    </section>
  );
};
