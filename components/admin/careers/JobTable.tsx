import React from "react";
import { CareerType, CareerStatus } from "@/types/career";
import { MapPinIcon, ClockIcon, EditIcon, TrashIcon } from "./CareerIcons";

export interface JobTableProps {
  careers: CareerType[];
  onEdit: (career: CareerType) => void;
  onDelete: (id: number | string, title: string) => void;
}

export const JobTable: React.FC<JobTableProps> = ({
  careers,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Recently";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Recently";
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "Recently";
    }
  };

  return (
    <>
      {/* DESKTOP RESPONSIVE TABLE VIEW */}
      <div className="desktop-table-view">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "28%" }}>Job Title</th>
              <th style={{ width: "14%" }}>Department</th>
              <th style={{ width: "18%" }}>Location</th>
              <th style={{ width: "12%" }}>Type</th>
              <th style={{ width: "14%" }}>Status</th>
              <th style={{ width: "14%" }}>Date Posted</th>
              <th style={{ textAlign: "right", width: "16%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map(career => {
              const currentStatus: CareerStatus = career.status || (career.is_active ? "published" : "draft");
              return (
                <tr key={career.id}>
                  <td>
                    <div style={{ fontWeight: "600", color: "#0f172a", fontSize: "14px" }}>
                      {career.title}
                    </div>
                  </td>
                  <td>
                    <span className="job-badge badge-dept">{career.department}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#334155", fontSize: "13px" }}>
                      <MapPinIcon size={13} />
                      <span>{career.location}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#334155", fontSize: "13px" }}>
                      <ClockIcon size={13} />
                      <span>{career.type}</span>
                    </div>
                  </td>
                  <td>
                    {/* Status Badge Only (No inline change option) */}
                    <span className={`status-badge ${currentStatus}`}>
                      <span className={`status-dot ${currentStatus}`} />
                      <span style={{ textTransform: "capitalize" }}>{currentStatus}</span>
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      {formatDate(career.created_at)}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <button 
                        onClick={() => onEdit(career)} 
                        className="admin-action-btn"
                        title="Edit this role"
                      >
                        <EditIcon size={12} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => career.id && onDelete(career.id, career.title)}
                        className="admin-action-btn btn-delete"
                        title="Permanently delete role"
                      >
                        <TrashIcon size={12} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE COMPACT JOB CARDS VIEW */}
      <div className="mobile-cards-view">
        {careers.map(career => {
          const currentStatus: CareerStatus = career.status || (career.is_active ? "published" : "draft");
          return (
            <div key={career.id} className="mobile-job-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                <div>
                  <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "15px" }}>{career.title}</div>
                </div>
                <span className={`status-badge ${currentStatus}`}>
                  <span className={`status-dot ${currentStatus}`} />
                  <span style={{ textTransform: "capitalize" }}>{currentStatus}</span>
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "10px 0 14px", alignItems: "center" }}>
                <span className="job-badge badge-dept">{career.department}</span>
                <span className="job-badge">
                  <MapPinIcon size={12} />
                  <span>{career.location}</span>
                </span>
                <span className="job-badge">
                  <ClockIcon size={12} />
                  <span>{career.type}</span>
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "12px", marginTop: "12px" }}>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                  Posted {formatDate(career.created_at)}
                </div>
                <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                  <button onClick={() => onEdit(career)} className="admin-action-btn">
                    <EditIcon size={12} />
                    <span>Edit</span>
                  </button>
                  <button onClick={() => career.id && onDelete(career.id, career.title)} className="admin-action-btn btn-delete">
                    <TrashIcon size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default JobTable;
