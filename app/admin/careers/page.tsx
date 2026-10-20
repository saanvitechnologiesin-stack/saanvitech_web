"use client";

import React, { useState, useEffect } from "react";
import { CareerType, CareerStatus, CareerApplicationType, ApplicationStatus } from "@/types/career";
import "@/styles/careers.css";

// Modular Admin Components
import { AdminLoginCard } from "@/components/admin/careers/AdminLoginCard";
import { AdminHeader } from "@/components/admin/careers/AdminHeader";
import { AdminStatCards } from "@/components/admin/careers/AdminStatCards";
import { JobTable } from "@/components/admin/careers/JobTable";
import { ApplicationsTable } from "@/components/admin/careers/ApplicationsTable";
import { CareerModal, CareerFormData } from "@/components/admin/careers/CareerModal";
import { DeleteConfirmModal } from "@/components/common/DeleteConfirmModal";
import {
  CheckIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  PauseCircleIcon,
  FileTextIcon,
  SearchIcon,
  CloseIcon,
  BriefcaseIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
} from "@/components/admin/careers/CareerIcons";

export default function AdminCareersPage() {
  // Authentication & Session state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Careers state
  const [careers, setCareers] = useState<CareerType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);

  // Directory Search, Filter, Tabs & Pagination state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterDepartment, setFilterDepartment] = useState<string>("All");
  const [activeStatusTab, setActiveStatusTab] = useState<"all" | CareerStatus>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Top View Navigation
  const [activeAdminView, setActiveAdminView] = useState<"jobs" | "applications">("jobs");

  // Applications state
  const [applications, setApplications] = useState<CareerApplicationType[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState<boolean>(false);
  const [appSearchQuery, setAppSearchQuery] = useState<string>("");
  const [appStatusFilter, setAppStatusFilter] = useState<"all" | ApplicationStatus>("all");
  const [appCurrentPage, setAppCurrentPage] = useState<number>(1);
  const appItemsPerPage = 8;

  // Toast feedback state
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Delete Confirmation Modal state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: number | string | null;
    itemName: string;
    itemType: "job role" | "candidate application";
    isDeleting: boolean;
  }>({
    isOpen: false,
    id: null,
    itemName: "",
    itemType: "job role",
    isDeleting: false,
  });

  // Form state
  const [formData, setFormData] = useState<CareerFormData>({
    title: "",
    department: "Engineering",
    location: "Bengaluru, India (Hybrid)",
    type: "Full-time",
    experience: "2-4 Years",
    salary: "Competitive",
    status: "published",
    overview: "",
    responsibilities: [""],
    requirements: [""],
    benefits: [""],
    is_active: true,
  });

  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  useEffect(() => {
    async function checkSession() {
      try {
        const savedToken = sessionStorage.getItem("saanvi_admin_token") || "";
        const res = await fetch("/api/admin/auth", {
          headers: savedToken ? { "x-admin-key": savedToken } : {},
        });
        const data = await res.json();
        if (data.authenticated && data.user) {
          setIsAuthenticated(true);
          setAdminUser(data.user);
          setToken(savedToken);
          fetchCareers(savedToken);
          fetchApplications(savedToken);
        }
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setAuthChecking(false);
      }
    }
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        sessionStorage.setItem("saanvi_admin_token", data.token);
        setToken(data.token);
        setAdminUser(data.user);
        setIsAuthenticated(true);
        fetchCareers(data.token);
        fetchApplications(data.token);
        showToast("success", `Welcome back, ${data.user?.name || "Admin"}!`);
      } else {
        setAuthError(data.error || "Invalid email or password.");
      }
    } catch {
      setAuthError("Failed to authenticate. Please check your network and try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {}
    sessionStorage.removeItem("saanvi_admin_token");
    setIsAuthenticated(false);
    setToken("");
    setAdminUser(null);
    setEmail("");
    setPassword("");
  };

  const fetchCareers = async (authToken?: string) => {
    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      const key = authToken || token || (typeof window !== "undefined" ? sessionStorage.getItem("saanvi_admin_token") || "" : "");
      if (key) headers["x-admin-key"] = key;

      const res = await fetch("/api/careers?all=true", { headers });
      const data = await res.json();
      if (data.success) {
        setCareers(data.careers || []);
      }
    } catch (err) {
      console.error("Failed to load careers:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (authToken?: string) => {
    setApplicationsLoading(true);
    try {
      const headers: Record<string, string> = {};
      const key = authToken || token || (typeof window !== "undefined" ? sessionStorage.getItem("saanvi_admin_token") || "" : "");
      if (key) headers["x-admin-key"] = key;

      const res = await fetch("/api/admin/applications", { headers });
      const data = await res.json();
      if (data.success && data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Fetch applications error:", err);
    } finally {
      setApplicationsLoading(false);
    }
  };

  const handleApplicationStatusChange = async (id: number | string, newStatus: ApplicationStatus) => {
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": token,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev =>
          prev.map(a => (a.id === id ? { ...a, status: newStatus } : a))
        );
        showToast("success", `Candidate status updated to ${newStatus}`);
      } else {
        showToast("error", data.error || "Failed to update status");
      }
    } catch {
      showToast("error", "Network error updating application status");
    }
  };

  const openDeleteApplicationModal = (id: number | string, candidateName: string) => {
    setDeleteModal({
      isOpen: true,
      id,
      itemName: candidateName,
      itemType: "candidate application",
      isDeleting: false,
    });
  };

  const openDeleteJobModal = (id: number | string, roleTitle: string) => {
    setDeleteModal({
      isOpen: true,
      id,
      itemName: roleTitle,
      itemType: "job role",
      isDeleting: false,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.id) return;
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));

    if (deleteModal.itemType === "job role") {
      try {
        const res = await fetch(`/api/careers/${deleteModal.id}`, {
          method: "DELETE",
          headers: { "x-admin-key": token },
        });
        if (res.ok) {
          setCareers(prev => prev.filter(c => c.id !== deleteModal.id));
          showToast("success", `Deleted position "${deleteModal.itemName}"`);
          setDeleteModal({ isOpen: false, id: null, itemName: "", itemType: "job role", isDeleting: false });
        } else {
          showToast("error", "Failed to delete position");
          setDeleteModal(prev => ({ ...prev, isDeleting: false }));
        }
      } catch (err) {
        console.error("Failed to delete position:", err);
        showToast("error", "Error connecting to server");
        setDeleteModal(prev => ({ ...prev, isDeleting: false }));
      }
    } else {
      try {
        const res = await fetch(`/api/admin/applications?id=${deleteModal.id}`, {
          method: "DELETE",
          headers: { "x-admin-key": token },
        });
        const data = await res.json();
        if (data.success) {
          setApplications(prev => prev.filter(a => a.id !== deleteModal.id));
          showToast("success", `Deleted application from ${deleteModal.itemName}`);
          setDeleteModal({ isOpen: false, id: null, itemName: "", itemType: "job role", isDeleting: false });
        } else {
          showToast("error", data.error || "Failed to delete application");
          setDeleteModal(prev => ({ ...prev, isDeleting: false }));
        }
      } catch {
        showToast("error", "Network error deleting application");
        setDeleteModal(prev => ({ ...prev, isDeleting: false }));
      }
    }
  };

  const handleUpdateStatus = async (career: CareerType, newStatus: CareerStatus) => {
    try {
      const isPublished = newStatus === "published";
      const res = await fetch(`/api/careers/${career.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": token,
        },
        body: JSON.stringify({
          status: newStatus,
          is_active: isPublished,
        }),
      });
      if (res.ok) {
        setCareers(prev =>
          prev.map(c =>
            c.id === career.id ? { ...c, status: newStatus, is_active: isPublished } : c
          )
        );
        showToast("success", `Status updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`);
      } else {
        showToast("error", "Failed to update role status");
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      showToast("error", "Error connecting to server");
    }
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      department: "Engineering",
      location: "Bengaluru, India (Hybrid)",
      type: "Full-time",
      experience: "2-4 Years",
      salary: "Competitive",
      status: "published",
      overview: "",
      responsibilities: [""],
      requirements: [""],
      benefits: [""],
      is_active: true,
    });
    setFeedbackMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (career: CareerType) => {
    setEditingId(career.id || null);
    const resolvedStatus: CareerStatus = career.status || (career.is_active ? "published" : "draft");
    setFormData({
      title: career.title,
      department: career.department,
      location: career.location,
      type: career.type,
      experience: career.experience || "",
      salary: career.salary || "",
      status: resolvedStatus,
      overview: career.overview,
      responsibilities: career.responsibilities?.length ? career.responsibilities : [""],
      requirements: career.requirements?.length ? career.requirements : [""],
      benefits: career.benefits?.length ? career.benefits : [""],
      is_active: resolvedStatus === "published",
    });
    setFeedbackMsg(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFeedbackMsg(null);

    const isPublished = formData.status === "published";
    const payload = {
      ...formData,
      is_active: isPublished,
      responsibilities: formData.responsibilities.filter(r => r.trim().length > 0),
      requirements: formData.requirements.filter(r => r.trim().length > 0),
      benefits: formData.benefits.filter(r => r.trim().length > 0),
    };

    try {
      const url = editingId ? `/api/careers/${editingId}` : "/api/careers";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": token,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        showToast("success", editingId ? "Job role updated successfully!" : "New job role posted successfully!");
        fetchCareers(token);
      } else {
        setFeedbackMsg({ type: "error", text: data.error || "Failed to save role." });
      }
    } catch {
      setFeedbackMsg({ type: "error", text: "Network error occurred." });
    } finally {
      setFormSubmitting(false);
    }
  };

  // UN-AUTHENTICATED: Clean WordPress-style login page
  if (authChecking) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#64748b", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>Loading Careers Management Portal...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLoginCard
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        authError={authError}
        onLogin={handleLogin}
      />
    );
  }

  // DYNAMIC STATISTIC COUNTS
  const totalCount = careers.length;
  const publishedCount = careers.filter(c => (c.status || (c.is_active ? "published" : "draft")) === "published").length;
  const draftCount = careers.filter(c => (c.status || (c.is_active ? "published" : "draft")) === "draft").length;
  const pausedCount = careers.filter(c => c.status === "paused").length;

  // Department list
  const departments = ["All", ...Array.from(new Set(careers.map(c => c.department).filter(Boolean)))];

  // Filtering
  const filteredCareers = careers.filter(job => {
    const jobStatus: CareerStatus = job.status || (job.is_active ? "published" : "draft");
    const matchesStatusTab = activeStatusTab === "all" || jobStatus === activeStatusTab;
    const matchesDept = filterDepartment === "All" || job.department === filterDepartment;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.department.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.type.toLowerCase().includes(query);

    return matchesStatusTab && matchesDept && matchesSearch;
  });

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredCareers.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedCareers = filteredCareers.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSearchQuery("");
    setFilterDepartment("All");
    setActiveStatusTab("all");
    setCurrentPage(1);
  };

  // Dynamic Application Counts
  const appTotalCount = applications.length;
  const appNewCount = applications.filter(a => (a.status || "new") === "new").length;
  const appReviewedCount = applications.filter(a => a.status === "reviewed").length;
  const appShortlistedCount = applications.filter(a => a.status === "shortlisted").length;
  const appRejectedCount = applications.filter(a => a.status === "rejected").length;

  // Applications Filtering
  const filteredApplications = applications.filter(app => {
    const matchesStatus = appStatusFilter === "all" || (app.status || "new") === appStatusFilter;
    const q = appSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      app.name?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.roleTitle?.toLowerCase().includes(q) ||
      app.phone?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const appTotalPages = Math.max(1, Math.ceil(filteredApplications.length / appItemsPerPage));
  const appSafeCurrentPage = Math.min(appCurrentPage, appTotalPages);
  const paginatedApplications = filteredApplications.slice(
    (appSafeCurrentPage - 1) * appItemsPerPage,
    appSafeCurrentPage * appItemsPerPage
  );

  const clearAppFilters = () => {
    setAppSearchQuery("");
    setAppStatusFilter("all");
    setAppCurrentPage(1);
  };

  return (
    <div className="admin-page-bg">
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Toast Notification */}
        {toast && (
          <div className={`saas-toast ${toast.type}`} role="alert">
            {toast.type === "success" ? <CheckIcon size={16} /> : <AlertCircleIcon size={16} />}
            <span>{toast.text}</span>
          </div>
        )}

        {/* 1. COMPACT DARK NAVY COMPANY HEADER */}
        <AdminHeader
          adminEmail={adminUser?.email || email || "admin@saanvitech.com"}
          adminName={adminUser?.name || "Saanvi Admin"}
          onOpenNewModal={openNewModal}
          onLogout={handleLogout}
        />

        {/* VIEW NAVIGATION TABS */}
        <div style={{
          display: "flex",
          gap: "8px",
          margin: "20px 0 18px",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "2px"
        }}>
          <button
            onClick={() => setActiveAdminView("jobs")}
            style={{
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              borderBottom: activeAdminView === "jobs" ? "2px solid #0284c7" : "2px solid transparent",
              color: activeAdminView === "jobs" ? "#0284c7" : "#64748b",
              cursor: "pointer",
              transition: "all 0.15s ease",
              marginBottom: "-1px"
            }}
          >
            <BriefcaseIcon size={16} />
            <span>Job Postings</span>
            <span style={{
              background: activeAdminView === "jobs" ? "#e0f2fe" : "#f1f5f9",
              color: activeAdminView === "jobs" ? "#0284c7" : "#64748b",
              fontSize: "12px",
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: "10px"
            }}>
              {careers.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveAdminView("applications");
              fetchApplications();
            }}
            style={{
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              borderBottom: activeAdminView === "applications" ? "2px solid #0284c7" : "2px solid transparent",
              color: activeAdminView === "applications" ? "#0284c7" : "#64748b",
              cursor: "pointer",
              transition: "all 0.15s ease",
              marginBottom: "-1px"
            }}
          >
            <UserIcon size={16} />
            <span>Candidate Applications</span>
            <span style={{
              background: activeAdminView === "applications" ? "#e0f2fe" : "#f1f5f9",
              color: activeAdminView === "applications" ? "#0284c7" : "#64748b",
              fontSize: "12px",
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: "10px"
            }}>
              {applications.length}
            </span>
            {appNewCount > 0 && (
              <span style={{
                background: "#0284c7",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: "10px"
              }}>
                {appNewCount} New
              </span>
            )}
          </button>
        </div>

        {activeAdminView === "jobs" ? (
          <>
            {/* 2. FOUR RESPONSIVE STATISTIC CARDS */}
            <AdminStatCards
          totalCount={totalCount}
          publishedCount={publishedCount}
          draftCount={draftCount}
          pausedCount={pausedCount}
          activeStatusTab={activeStatusTab}
          onSelectTab={tab => {
            setActiveStatusTab(tab);
            setCurrentPage(1);
          }}
        />

        {/* 3. JOB POSTINGS DIRECTORY */}
        <section className="saas-table-card" aria-label="Job Postings Directory">
          {/* Status Tabs */}
          <div className="status-tabs-container">
            <button
              onClick={() => { setActiveStatusTab("all"); setCurrentPage(1); }}
              className={`status-tab-btn ${activeStatusTab === "all" ? "active" : ""}`}
            >
              <span>All Roles</span>
              <span className="status-tab-badge">{totalCount}</span>
            </button>

            <button
              onClick={() => { setActiveStatusTab("published"); setCurrentPage(1); }}
              className={`status-tab-btn ${activeStatusTab === "published" ? "active" : ""}`}
            >
              <span>Published</span>
              <span className="status-tab-badge">{publishedCount}</span>
            </button>

            <button
              onClick={() => { setActiveStatusTab("draft"); setCurrentPage(1); }}
              className={`status-tab-btn ${activeStatusTab === "draft" ? "active" : ""}`}
            >
              <span>Drafts</span>
              <span className="status-tab-badge">{draftCount}</span>
            </button>

            <button
              onClick={() => { setActiveStatusTab("paused"); setCurrentPage(1); }}
              className={`status-tab-btn ${activeStatusTab === "paused" ? "active" : ""}`}
            >
              <span>Paused</span>
              <span className="status-tab-badge">{pausedCount}</span>
            </button>
          </div>

          {/* Directory Toolbar: Search & Department Filter */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 2px", color: "#0f172a" }}>
                Job Postings Directory
              </h2>
              <span style={{ fontSize: "13px", color: "#64748b" }}>
                Showing {filteredCareers.length} of {careers.length} total positions
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              {/* Search Input */}
              <div style={{ position: "relative", minWidth: "240px" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center" }}>
                  <SearchIcon size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Search by title, location, type..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  style={{
                    width: "100%",
                    height: "36px",
                    minHeight: "36px",
                    padding: "4px 10px 4px 32px",
                    fontSize: "13px",
                    color: "#1e293b",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    outline: "none",
                    background: "#f8fafc",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Department Filter */}
              <select
                value={filterDepartment}
                onChange={e => { setFilterDepartment(e.target.value); setCurrentPage(1); }}
                style={{
                  height: "36px",
                  minHeight: "36px",
                  padding: "4px 12px",
                  fontSize: "13px",
                  color: "#1e293b",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  outline: "none",
                  background: "#f8fafc",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept === "All" ? "All Departments" : dept}</option>
                ))}
              </select>

              {(searchQuery || filterDepartment !== "All" || activeStatusTab !== "all") && (
                <button
                  onClick={clearFilters}
                  style={{
                    height: "36px",
                    minHeight: "36px",
                    padding: "0 12px",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#475569",
                    background: "#f1f5f9",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <CloseIcon size={12} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Directory Content Area */}
          {loading ? (
            <div style={{ padding: "60px 20px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
              Loading job postings...
            </div>
          ) : careers.length === 0 ? (
            /* Empty State: No jobs in portal */
            <div className="saas-empty-state">
              <div className="saas-empty-icon">
                <BriefcaseIcon size={28} />
              </div>
              <h3 className="saas-empty-title">No job openings yet</h3>
              <p className="saas-empty-desc">
                Get started by creating your first job opening to attract qualified candidates to Saanvi Technologies.
              </p>
              <button 
                onClick={openNewModal} 
                className="btn-apply" 
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  margin: "0 auto",
                  background: "#2563eb",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                <PlusIcon size={16} />
                <span>Create Your First Job</span>
              </button>
            </div>
          ) : filteredCareers.length === 0 ? (
            /* Filter Empty State */
            <div className="saas-empty-state">
              <div className="saas-empty-icon" style={{ background: "#f1f5f9", color: "#64748b", borderColor: "#e2e8f0" }}>
                <SearchIcon size={24} />
              </div>
              <h3 className="saas-empty-title">No matching job positions</h3>
              <p className="saas-empty-desc">
                No roles match your active filters {searchQuery && `for "${searchQuery}"`}. Try adjusting your search query, department, or status tab.
              </p>
              <button 
                onClick={clearFilters}
                className="admin-action-btn"
                style={{ padding: "8px 16px", fontSize: "13px", fontWeight: "600" }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Responsive Table & Cards */}
              <JobTable
                careers={paginatedCareers}
                onEdit={openEditModal}
                onDelete={openDeleteJobModal}
              />

              {/* PAGINATION BAR */}
              <div className="saas-pagination">
                <div style={{ fontSize: "13px", color: "#64748b" }}>
                  Showing{" "}
                  <strong>{(safeCurrentPage - 1) * itemsPerPage + 1}</strong> to{" "}
                  <strong>{Math.min(safeCurrentPage * itemsPerPage, filteredCareers.length)}</strong> of{" "}
                  <strong>{filteredCareers.length}</strong> positions
                </div>

                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={safeCurrentPage === 1}
                    className="page-btn"
                    title="Previous page"
                    aria-label="Previous page"
                  >
                    <ChevronLeftIcon size={14} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`page-btn ${pageNum === safeCurrentPage ? "active" : ""}`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={safeCurrentPage === totalPages}
                    className="page-btn"
                    title="Next page"
                    aria-label="Next page"
                  >
                    <ChevronRightIcon size={14} />
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
          </>
        ) : (
          <>
            {/* 2. APPLICATIONS STATISTIC CARDS */}
            <section className="admin-stats-grid" aria-label="Candidate Applications Overview">
              <div 
                className="saas-stat-card"
                onClick={() => { setAppStatusFilter("all"); setAppCurrentPage(1); }}
                style={{ cursor: "pointer" }}
              >
                <div className="saas-stat-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>
                  <UserIcon size={22} />
                </div>
                <div>
                  <div className="saas-stat-val">{appTotalCount}</div>
                  <div className="saas-stat-title">Total Submissions</div>
                  <div className="saas-stat-sub">All candidate applications</div>
                </div>
              </div>

              <div 
                className="saas-stat-card"
                onClick={() => { setAppStatusFilter("new"); setAppCurrentPage(1); }}
                style={{ cursor: "pointer" }}
              >
                <div className="saas-stat-icon" style={{ background: "#f0f9ff", color: "#0284c7" }}>
                  <FileTextIcon size={22} />
                </div>
                <div>
                  <div className="saas-stat-val" style={{ color: "#0284c7" }}>{appNewCount}</div>
                  <div className="saas-stat-title">New Applications</div>
                  <div className="saas-stat-sub">Awaiting initial review</div>
                </div>
              </div>

              <div 
                className="saas-stat-card"
                onClick={() => { setAppStatusFilter("reviewed"); setAppCurrentPage(1); }}
                style={{ cursor: "pointer" }}
              >
                <div className="saas-stat-icon" style={{ background: "#fef3c7", color: "#d97706" }}>
                  <PauseCircleIcon size={22} />
                </div>
                <div>
                  <div className="saas-stat-val" style={{ color: "#d97706" }}>{appReviewedCount}</div>
                  <div className="saas-stat-title">Under Review</div>
                  <div className="saas-stat-sub">Profiles evaluated</div>
                </div>
              </div>

              <div 
                className="saas-stat-card"
                onClick={() => { setAppStatusFilter("shortlisted"); setAppCurrentPage(1); }}
                style={{ cursor: "pointer" }}
              >
                <div className="saas-stat-icon" style={{ background: "#ecfdf5", color: "#059669" }}>
                  <CheckCircleIcon size={22} />
                </div>
                <div>
                  <div className="saas-stat-val" style={{ color: "#059669" }}>{appShortlistedCount}</div>
                  <div className="saas-stat-title">Shortlisted</div>
                  <div className="saas-stat-sub">Passed to interview stage</div>
                </div>
              </div>
            </section>

            {/* 3. CANDIDATE APPLICATIONS DIRECTORY */}
            <section className="saas-table-card" aria-label="Candidate Applications Directory">
              {/* Status Tabs */}
              <div className="status-tabs-container">
                <button
                  onClick={() => { setAppStatusFilter("all"); setAppCurrentPage(1); }}
                  className={`status-tab-btn ${appStatusFilter === "all" ? "active" : ""}`}
                >
                  <span>All Candidates</span>
                  <span className="status-tab-badge">{appTotalCount}</span>
                </button>

                <button
                  onClick={() => { setAppStatusFilter("new"); setAppCurrentPage(1); }}
                  className={`status-tab-btn ${appStatusFilter === "new" ? "active" : ""}`}
                >
                  <span>New</span>
                  <span className="status-tab-badge">{appNewCount}</span>
                </button>

                <button
                  onClick={() => { setAppStatusFilter("reviewed"); setAppCurrentPage(1); }}
                  className={`status-tab-btn ${appStatusFilter === "reviewed" ? "active" : ""}`}
                >
                  <span>Reviewed</span>
                  <span className="status-tab-badge">{appReviewedCount}</span>
                </button>

                <button
                  onClick={() => { setAppStatusFilter("shortlisted"); setAppCurrentPage(1); }}
                  className={`status-tab-btn ${appStatusFilter === "shortlisted" ? "active" : ""}`}
                >
                  <span>Shortlisted</span>
                  <span className="status-tab-badge">{appShortlistedCount}</span>
                </button>

                <button
                  onClick={() => { setAppStatusFilter("rejected"); setAppCurrentPage(1); }}
                  className={`status-tab-btn ${appStatusFilter === "rejected" ? "active" : ""}`}
                >
                  <span>Rejected</span>
                  <span className="status-tab-badge">{appRejectedCount}</span>
                </button>
              </div>

              {/* Directory Toolbar: Search & Refresh */}
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 2px", color: "#0f172a" }}>
                    Candidate Applications Directory
                  </h2>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>
                    Showing {filteredApplications.length} of {applications.length} total submissions
                  </span>
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                  {/* Search Input */}
                  <div style={{ position: "relative", minWidth: "260px" }}>
                    <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center" }}>
                      <SearchIcon size={14} />
                    </span>
                    <input
                      type="text"
                      placeholder="Search candidate, role, email..."
                      value={appSearchQuery}
                      onChange={e => { setAppSearchQuery(e.target.value); setAppCurrentPage(1); }}
                      style={{
                        width: "100%",
                        height: "36px",
                        minHeight: "36px",
                        padding: "4px 10px 4px 32px",
                        fontSize: "13px",
                        color: "#1e293b",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        outline: "none",
                        background: "#f8fafc",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  {(appSearchQuery || appStatusFilter !== "all") && (
                    <button
                      onClick={clearAppFilters}
                      style={{
                        height: "36px",
                        minHeight: "36px",
                        padding: "0 12px",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#475569",
                        background: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <CloseIcon size={12} />
                      <span>Clear</span>
                    </button>
                  )}

                  <button
                    onClick={() => fetchApplications()}
                    title="Refresh applications"
                    style={{
                      height: "36px",
                      minHeight: "36px",
                      padding: "0 14px",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#0f172a",
                      background: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {/* Directory Content: Table, Empty State, or Loading */}
              {applicationsLoading ? (
                <div style={{ padding: "48px 20px", textAlign: "center", color: "#64748b" }}>
                  <div className="spinner" style={{ margin: "0 auto 12px" }}></div>
                  <p style={{ margin: 0, fontSize: "14px" }}>Loading candidate applications...</p>
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="saas-empty-state">
                  <div className="saas-empty-icon" style={{ background: "#f0f9ff", color: "#0284c7" }}>
                    <UserIcon size={28} />
                  </div>
                  <h3 className="saas-empty-title">
                    {applications.length === 0 ? "No applications received yet" : "No matching candidates"}
                  </h3>
                  <p className="saas-empty-desc">
                    {applications.length === 0
                      ? "When candidates submit the application form on the careers page with their resume, their profile and resume will appear here in real time."
                      : `No candidate matches your current filter ${appSearchQuery ? `"${appSearchQuery}"` : ""}. Try adjusting or clearing your filter.`}
                  </p>
                  {(appSearchQuery || appStatusFilter !== "all") && (
                    <button 
                      onClick={clearAppFilters}
                      className="admin-action-btn"
                      style={{ padding: "8px 16px", fontSize: "13px", fontWeight: "600" }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <ApplicationsTable
                    applications={paginatedApplications}
                    onStatusChange={handleApplicationStatusChange}
                    onDelete={openDeleteApplicationModal}
                  />

                  {/* Applications Pagination */}
                  <div className="saas-pagination">
                    <div style={{ fontSize: "13px", color: "#64748b" }}>
                      Showing{" "}
                      <strong>{(appSafeCurrentPage - 1) * appItemsPerPage + 1}</strong> to{" "}
                      <strong>{Math.min(appSafeCurrentPage * appItemsPerPage, filteredApplications.length)}</strong> of{" "}
                      <strong>{filteredApplications.length}</strong> candidates
                    </div>

                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <button
                        onClick={() => setAppCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={appSafeCurrentPage === 1}
                        className="page-btn"
                        title="Previous page"
                        aria-label="Previous page"
                      >
                        <ChevronLeftIcon size={14} />
                      </button>

                      {Array.from({ length: appTotalPages }, (_, i) => i + 1).map(pageNum => (
                        <button
                          key={pageNum}
                          onClick={() => setAppCurrentPage(pageNum)}
                          className={`page-btn ${pageNum === appSafeCurrentPage ? "active" : ""}`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        onClick={() => setAppCurrentPage(prev => Math.min(prev + 1, appTotalPages))}
                        disabled={appSafeCurrentPage === appTotalPages}
                        className="page-btn"
                        title="Next page"
                        aria-label="Next page"
                      >
                        <ChevronRightIcon size={14} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>
          </>
        )}

        {/* 4. MODULAR POST / EDIT JOB ROLE MODAL */}
        <CareerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editingId={editingId}
          formData={formData}
          setFormData={setFormData}
          formSubmitting={formSubmitting}
          feedbackMsg={feedbackMsg}
          onSubmit={handleFormSubmit}
        />

        {/* 5. REUSABLE DELETE CONFIRMATION MODAL */}
        <DeleteConfirmModal
          isOpen={deleteModal.isOpen}
          title={`Delete ${deleteModal.itemType === "job role" ? "Job Position" : "Candidate Application"}`}
          itemName={deleteModal.itemName}
          itemType={deleteModal.itemType}
          warningText={
            deleteModal.itemType === "job role"
              ? "This role will be removed immediately from the public careers page."
              : "The candidate's application and resume file will be permanently removed."
          }
          isDeleting={deleteModal.isDeleting}
          onConfirm={handleConfirmDelete}
          onClose={() =>
            !deleteModal.isDeleting &&
            setDeleteModal(prev => ({ ...prev, isOpen: false }))
          }
        />
      </div>
    </div>
  );
}
