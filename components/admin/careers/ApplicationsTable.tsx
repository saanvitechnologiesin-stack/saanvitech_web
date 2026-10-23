import React, { useState } from "react";
import { CareerApplicationType, ApplicationStatus } from "@/types/career";
import {
  FileTextIcon,
  ExternalLinkIcon,
  TrashIcon,
  CloseIcon,
  CheckCircleIcon,
  UserIcon,
} from "./CareerIcons";

export interface ApplicationsTableProps {
  applications: CareerApplicationType[];
  onStatusChange: (id: number | string, status: ApplicationStatus) => void;
  onDelete: (id: number | string, candidateName: string) => void;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  onStatusChange,
  onDelete,
}) => {
  const [selectedApp, setSelectedApp] = useState<CareerApplicationType | null>(null);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Recently";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Recently";
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Recently";
    }
  };

  const resolveResumeUrl = (rawLink?: string) => {
    if (!rawLink) return "";
    if (rawLink.startsWith("/uploads/resumes/")) {
      const filename = rawLink.replace("/uploads/resumes/", "");
      return `/api/admin/resumes/${filename}`;
    }
    return rawLink;
  };

  const getStatusBadgeClass = (status?: ApplicationStatus) => {
    switch (status) {
      case "shortlisted":
        return "status-badge published";
      case "reviewed":
        return "status-badge paused";
      case "rejected":
        return "status-badge draft";
      case "new":
      default:
        return "status-badge published";
    }
  };

  return (
    <>
      {/* DESKTOP RESPONSIVE TABLE VIEW */}
      <div className="desktop-table-view">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "24%" }}>Candidate</th>
              <th style={{ width: "22%" }}>Position Applied</th>
              <th style={{ width: "16%" }}>Resume</th>
              <th style={{ width: "16%" }}>Status</th>
              <th style={{ width: "12%" }}>Date</th>
              <th style={{ textAlign: "right", width: "10%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => {
              const currentStatus: ApplicationStatus = app.status || "new";
              const resumeLink = resolveResumeUrl(app.resumeFilePath || app.resumeUrl);

              return (
                <tr key={app.id}>
                  <td>
                    <div style={{ fontWeight: "600", color: "#0f172a", fontSize: "14px" }}>
                      {app.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                      <a href={`mailto:${app.email}`} style={{ color: "#093d64", textDecoration: "none" }}>
                        {app.email}
                      </a>
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      {app.phone}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: "600", color: "#1e293b", fontSize: "13px" }}>
                      {app.roleTitle}
                    </div>
                  </td>
                  <td>
                    {resumeLink ? (
                      <a
                        href={resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-details"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px",
                          padding: "5px 10px",
                          textDecoration: "none",
                          color: "#093d64",
                        }}
                      >
                        <FileTextIcon size={14} />
                        <span>View Resume</span>
                        <ExternalLinkIcon size={12} />
                      </a>
                    ) : (
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>No resume</span>
                    )}
                  </td>
                  <td>
                    <select
                      value={currentStatus}
                      onChange={e => onStatusChange(app.id!, e.target.value as ApplicationStatus)}
                      className={`status-select ${currentStatus}`}
                      style={{ fontSize: "12px", padding: "4px 8px", borderRadius: "6px" }}
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      {formatDate(app.created_at)}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="action-btn edit"
                        title="View Full Application"
                        aria-label="View Full Application"
                      >
                        <UserIcon size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(app.id!, app.name)}
                        className="action-btn delete"
                        title="Delete application"
                        aria-label="Delete application"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="mobile-cards-view">
        {applications.map(app => {
          const currentStatus: ApplicationStatus = app.status || "new";
          const resumeLink = resolveResumeUrl(app.resumeFilePath || app.resumeUrl);

          return (
            <div key={app.id} className="mobile-job-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div>
                  <h3 style={{ fontSize: "16px", margin: "0 0 2px" }}>{app.name}</h3>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>{app.roleTitle}</div>
                </div>
                <select
                  value={currentStatus}
                  onChange={e => onStatusChange(app.id!, e.target.value as ApplicationStatus)}
                  className={`status-select ${currentStatus}`}
                  style={{ fontSize: "12px", padding: "3px 6px" }}
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div style={{ fontSize: "13px", color: "#475569", margin: "8px 0" }}>
                <div>Email: <a href={`mailto:${app.email}`}>{app.email}</a></div>
                <div>Phone: {app.phone}</div>
                <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                  Submitted: {formatDate(app.created_at)}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
                {resumeLink ? (
                  <a
                    href={resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-details"
                    style={{ fontSize: "12px", padding: "4px 8px", textDecoration: "none" }}
                  >
                    Resume ↗
                  </a>
                ) : (
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>No resume</span>
                )}

                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={() => setSelectedApp(app)}
                    className="action-btn edit"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(app.id!, app.name)}
                    className="action-btn delete"
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* APPLICATION DETAILS MODAL */}
      {selectedApp && (
        <div
          className="career-modal-backdrop"
          onClick={e => {
            if (e.target === e.currentTarget) setSelectedApp(null);
          }}
        >
          <div className="career-modal-dialog" onClick={e => e.stopPropagation()} style={{ maxWidth: "600px" }}>
            <div className="modal-header-sticky">
              <div>
                <span className={`status-badge ${selectedApp.status || "new"}`} style={{ marginBottom: "4px" }}>
                  <span className={`status-dot ${selectedApp.status || "new"}`} />
                  <span style={{ textTransform: "capitalize" }}>{selectedApp.status || "new"}</span>
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "4px 0 0" }}>
                  {selectedApp.name}
                </h3>
                <div style={{ fontSize: "13px", color: "#64748b" }}>
                  Applied for: <strong>{selectedApp.roleTitle}</strong>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="modal-close-btn"
                aria-label="Close"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <div className="modal-body-scrollable" style={{ padding: "20px 24px", background: "#ffffff" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Email</div>
                  <div style={{ fontSize: "14px", fontWeight: "500", color: "#0f172a" }}>
                    <a href={`mailto:${selectedApp.email}`}>{selectedApp.email}</a>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Phone</div>
                  <div style={{ fontSize: "14px", fontWeight: "500", color: "#0f172a" }}>
                    <a href={`tel:${selectedApp.phone}`}>{selectedApp.phone}</a>
                  </div>
                </div>
                {selectedApp.linkedin && (
                  <div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>LinkedIn</div>
                    <div style={{ fontSize: "14px", fontWeight: "500" }}>
                      <a href={selectedApp.linkedin} target="_blank" rel="noopener noreferrer">
                        Profile ↗
                      </a>
                    </div>
                  </div>
                )}
                {selectedApp.portfolio && (
                  <div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>Portfolio / GitHub</div>
                    <div style={{ fontSize: "14px", fontWeight: "500" }}>
                      <a href={selectedApp.portfolio} target="_blank" rel="noopener noreferrer">
                        Portfolio ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Resume */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>Candidate Resume</div>
                {selectedApp.resumeFilePath || selectedApp.resumeUrl ? (
                  <a
                    href={resolveResumeUrl(selectedApp.resumeFilePath || selectedApp.resumeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-apply"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "13px", padding: "8px 16px" }}
                  >
                    <FileTextIcon size={16} />
                    <span>Download / Open Resume ↗</span>
                  </a>
                ) : (
                  <span style={{ fontSize: "13px", color: "#94a3b8" }}>No resume file attached</span>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>Cover Letter / Note</div>
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "12px 14px", borderRadius: "8px", fontSize: "14px", color: "#334155", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {selectedApp.coverLetter || "No cover letter provided."}
                </div>
              </div>
            </div>

            <div style={{ padding: "14px 24px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "13px", color: "#64748b" }}>Status:</span>
                <select
                  value={selectedApp.status || "new"}
                  onChange={e => {
                    const newStatus = e.target.value as ApplicationStatus;
                    onStatusChange(selectedApp.id!, newStatus);
                    setSelectedApp({ ...selectedApp, status: newStatus });
                  }}
                  className={`status-select ${selectedApp.status || "new"}`}
                  style={{ fontSize: "13px", padding: "4px 8px" }}
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="btn-details"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
