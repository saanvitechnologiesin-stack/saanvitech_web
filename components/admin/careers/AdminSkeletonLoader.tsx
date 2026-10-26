import React from "react";

export const AdminSkeletonLoader: React.FC = () => {
  return (
    <div className="admin-page-bg" aria-busy="true" aria-label="Loading dashboard">
      <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        
        {/* 1. HEADER SKELETON */}
        <div className="admin-header-card">
          <div className="admin-header-titles">
            <div style={{ width: "140px", height: "12px", marginBottom: "8px" }} className="skeleton-shimmer-dark" />
            <div style={{ width: "260px", height: "24px", marginBottom: "8px" }} className="skeleton-shimmer-dark" />
            <div style={{ width: "340px", height: "14px", maxWidth: "100%" }} className="skeleton-shimmer-dark" />
          </div>

          <div className="admin-header-actions">
            <div style={{ width: "140px", height: "38px", borderRadius: "8px" }} className="skeleton-shimmer-dark" />
            <div style={{ width: "130px", height: "38px", borderRadius: "8px" }} className="skeleton-shimmer-dark" />
            <div style={{ width: "38px", height: "38px", borderRadius: "999px" }} className="skeleton-shimmer-dark" />
          </div>
        </div>

        {/* 2. VIEW NAVIGATION TABS SKELETON */}
        <div className="admin-view-nav-tabs">
          <div
            className="admin-view-nav-btn skeleton-shimmer"
            style={{ width: "100%", height: "36px", border: "none" }}
          />
          <div
            className="admin-view-nav-btn skeleton-shimmer"
            style={{ width: "100%", height: "36px", border: "none" }}
          />
        </div>

        {/* 3. FOUR STATISTIC CARDS SKELETON */}
        <div className="admin-stats-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="saas-stat-card">
              <div
                style={{ width: "42px", height: "42px", borderRadius: "10px", flexShrink: 0 }}
                className="skeleton-shimmer"
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ width: "45px", height: "22px", marginBottom: "6px" }} className="skeleton-shimmer" />
                <div style={{ width: "90px", height: "12px" }} className="skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>

        {/* 4. DIRECTORY TABLE CARD SKELETON */}
        <div className="saas-table-card">
          {/* Status Tabs Placeholder */}
          <div className="status-tabs-container" style={{ padding: "12px 20px" }}>
            <div style={{ width: "90px", height: "28px", borderRadius: "999px" }} className="skeleton-shimmer" />
            <div style={{ width: "80px", height: "28px", borderRadius: "999px" }} className="skeleton-shimmer" />
            <div style={{ width: "70px", height: "28px", borderRadius: "999px" }} className="skeleton-shimmer" />
            <div style={{ width: "70px", height: "28px", borderRadius: "999px" }} className="skeleton-shimmer" />
          </div>

          {/* Directory Toolbar Placeholder */}
          <div className="admin-dir-toolbar">
            <div className="admin-dir-toolbar-info">
              <div style={{ width: "180px", height: "18px", marginBottom: "6px" }} className="skeleton-shimmer" />
              <div style={{ width: "120px", height: "12px" }} className="skeleton-shimmer" />
            </div>

            <div className="admin-dir-toolbar-controls">
              <div style={{ width: "240px", height: "36px", borderRadius: "8px" }} className="skeleton-shimmer admin-dir-search-wrap" />
              <div className="admin-dir-controls-row">
                <div style={{ width: "130px", height: "36px", borderRadius: "8px" }} className="skeleton-shimmer" />
              </div>
            </div>
          </div>

          {/* Desktop Table Rows Placeholder */}
          <div className="desktop-table-view">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: "30%" }}>Role Title</th>
                  <th style={{ width: "15%" }}>Department</th>
                  <th style={{ width: "20%" }}>Location</th>
                  <th style={{ width: "15%" }}>Status</th>
                  <th style={{ width: "20%", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map(row => (
                  <tr key={row}>
                    <td>
                      <div style={{ width: "160px", height: "15px", marginBottom: "4px" }} className="skeleton-shimmer" />
                      <div style={{ width: "90px", height: "11px" }} className="skeleton-shimmer" />
                    </td>
                    <td>
                      <div style={{ width: "90px", height: "20px", borderRadius: "999px" }} className="skeleton-shimmer" />
                    </td>
                    <td>
                      <div style={{ width: "120px", height: "14px" }} className="skeleton-shimmer" />
                    </td>
                    <td>
                      <div style={{ width: "80px", height: "20px", borderRadius: "999px" }} className="skeleton-shimmer" />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        <div style={{ width: "55px", height: "28px", borderRadius: "6px" }} className="skeleton-shimmer" />
                        <div style={{ width: "55px", height: "28px", borderRadius: "6px" }} className="skeleton-shimmer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Placeholders */}
          <div className="mobile-cards-view">
            {[1, 2, 3].map(card => (
              <div key={card} className="mobile-job-card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div style={{ width: "140px", height: "16px" }} className="skeleton-shimmer" />
                  <div style={{ width: "65px", height: "20px", borderRadius: "999px" }} className="skeleton-shimmer" />
                </div>
                <div style={{ width: "80px", height: "12px", marginBottom: "14px" }} className="skeleton-shimmer" />
                <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                  <div style={{ width: "80px", height: "18px", borderRadius: "999px" }} className="skeleton-shimmer" />
                  <div style={{ width: "90px", height: "18px", borderRadius: "999px" }} className="skeleton-shimmer" />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ width: "70px", height: "12px" }} className="skeleton-shimmer" />
                  <div style={{ display: "flex", gap: "6px" }}>
                    <div style={{ width: "45px", height: "26px", borderRadius: "6px" }} className="skeleton-shimmer" />
                    <div style={{ width: "45px", height: "26px", borderRadius: "6px" }} className="skeleton-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="saas-pagination">
            <div style={{ width: "160px", height: "13px" }} className="skeleton-shimmer" />
            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "6px" }} className="skeleton-shimmer" />
              <div style={{ width: "32px", height: "32px", borderRadius: "6px" }} className="skeleton-shimmer" />
              <div style={{ width: "32px", height: "32px", borderRadius: "6px" }} className="skeleton-shimmer" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
