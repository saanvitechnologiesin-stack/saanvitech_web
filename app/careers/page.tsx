"use client";

import React, { useState, useEffect } from "react";
import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import BreadcrumbBannerImage from "@/public/img/banner/page-banner.jpg";
import BreadcrumbBannerImageTablet from "@/public/img/banner/page-banner-991.jpg";
import BreadcrumbBannerImageMobile from "@/public/img/banner/page-banner-575.jpg";
import { CareerType } from "@/types/career";
import "@/styles/careers.css";
import {
  FolderIcon,
  ClockIcon,
  MapPinIcon,
  TargetIcon,
  BanknoteIcon,
  CloseIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  RotateCcwIcon,
  FileTextIcon,
  UploadIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  LinkedinIcon,
  GlobeIcon,
  ShieldCheckIcon,
  ZapIcon,
  SendIcon,
  RocketIcon,
  SpinnerIcon,
} from "@/components/admin/careers/CareerIcons";

const PAGE_TITLE = "Careers at Saanvi Technologies";

export default function CareersPage() {
  const [careers, setCareers] = useState<CareerType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [locationSearch, setLocationSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [expandedSections, setExpandedSections] = useState<{
    location: boolean;
    jobType: boolean;
    experience: boolean;
  }>({
    location: true,
    jobType: false,
    experience: false,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Modal and inline expand states
  const [expandedJobIds, setExpandedJobIds] = useState<Record<string, boolean>>({});
  const [applyingJob, setApplyingJob] = useState<CareerType | null>(null);

  const toggleJobExpand = (jobKey: string) => {
    setExpandedJobIds(prev => ({
      ...prev,
      [jobKey]: !prev[jobKey],
    }));
  };

  // Application form state
  const [appForm, setAppForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submittingApp, setSubmittingApp] = useState<boolean>(false);
  const [appSuccessMsg, setAppSuccessMsg] = useState<string>("");
  const [appErrorMsg, setAppErrorMsg] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Bottom-Right Toast notification state
  const [toast, setToast] = useState<{ type: "success" | "error" | "warning"; text: string } | null>(null);

  const showToast = (type: "success" | "error" | "warning", text: string) => {
    setToast({ type, text });
    setTimeout(() => {
      setToast(null);
    }, 6000);
  };

  // Set document.title on mount
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

  // Debounce search input so backend isn't called on every keystroke
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 280);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Available Filter Options returned by PostgreSQL
  const [availableFilterOptions, setAvailableFilterOptions] = useState<{
    locations: string[];
    types: string[];
    experiences: string[];
    counts?: {
      locations: Record<string, number>;
      types: Record<string, number>;
      experiences: Record<string, number>;
    };
  }>({
    locations: [],
    types: [],
    experiences: [],
    counts: { locations: {}, types: {}, experiences: {} },
  });

  // Backend Search & Filtering via /api/careers
  useEffect(() => {
    let isCancelled = false;

    async function fetchCareersFromBackend() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedSearch.trim()) params.set("q", debouncedSearch.trim());
        selectedLocations.forEach(loc => params.append("locations", loc));
        selectedJobTypes.forEach(t => params.append("types", t));
        selectedExperiences.forEach(exp => params.append("experiences", exp));
        params.set("sort", sortBy);

        const res = await fetch(`/api/careers?${params.toString()}`);
        const data = await res.json();
        if (!isCancelled && data.success) {
          setCareers(data.careers || []);
          if (data.filterOptions) {
            setAvailableFilterOptions(data.filterOptions);
          }
        }
      } catch (err) {
        console.error("Backend careers search error:", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchCareersFromBackend();

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearch, selectedLocations, selectedJobTypes, selectedExperiences, sortBy]);

  // Filter option derivations from backend availableFilterOptions or fallback to current careers
  const allLocations = availableFilterOptions.locations.length > 0
    ? availableFilterOptions.locations
    : Array.from(new Set(careers.map(c => c.location).filter(Boolean))).sort();

  const jobTypesList = availableFilterOptions.types.length > 0
    ? availableFilterOptions.types
    : Array.from(new Set(careers.map(c => c.type).filter(Boolean))).sort();

  const experiencesList = availableFilterOptions.experiences.length > 0
    ? availableFilterOptions.experiences
    : Array.from(
      new Set(careers.map(c => c.experience).filter((exp): exp is string => Boolean(exp)))
    ).sort();

  const locationsList = allLocations.filter(loc =>
    loc.toLowerCase().includes(locationSearch.toLowerCase().trim())
  );

  const toggleSection = (section: "location" | "jobType" | "experience") => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleFilterItem = (
    item: string,
    selectedList: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList(prev =>
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedLocations([]);
    setSelectedJobTypes([]);
    setSelectedExperiences([]);
    setLocationSearch("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedLocations.length > 0 ||
    selectedJobTypes.length > 0 ||
    selectedExperiences.length > 0 ||
    locationSearch.trim().length > 0 ||
    searchQuery.trim().length > 0;

  // Careers are already filtered & sorted by PostgreSQL backend
  const filteredCareers = careers;

  const totalPages = Math.ceil(filteredCareers.length / itemsPerPage);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedCareers = filteredCareers.slice(startIndex, startIndex + itemsPerPage);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    const cleanPhone = appForm.phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setAppErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!resumeFile && !appForm.resumeUrl.trim()) {
      setAppErrorMsg("Please upload your resume file (PDF, DOC, DOCX) or provide a resume link.");
      return;
    }

    setSubmittingApp(true);
    setAppErrorMsg("");
    setAppSuccessMsg("");

    try {
      const formData = new FormData();
      formData.append("name", appForm.name);
      formData.append("email", appForm.email);
      formData.append("phone", appForm.phone);
      formData.append("linkedin", appForm.linkedin);
      formData.append("portfolio", appForm.portfolio);
      formData.append("coverLetter", appForm.coverLetter);
      formData.append("roleId", String(applyingJob.id || ""));
      formData.append("roleTitle", applyingJob.title);

      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      }
      if (appForm.resumeUrl.trim()) {
        formData.append("resumeUrl", appForm.resumeUrl.trim());
      }

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAppSuccessMsg(data.message || "Your application was submitted successfully!");
        showToast("success", data.message || "Application submitted successfully!");
        setAppForm({
          name: "",
          email: "",
          phone: "",
          linkedin: "",
          portfolio: "",
          resumeUrl: "",
          coverLetter: "",
        });
        setResumeFile(null);
      } else {
        const errorText = data.error || "Failed to submit application. Please try again.";
        setAppErrorMsg(errorText);
        showToast(data.alreadyApplied ? "warning" : "error", errorText);
      }
    } catch {
      const netError = "Network error occurred. Please try again.";
      setAppErrorMsg(netError);
      showToast("error", netError);
    } finally {
      setSubmittingApp(false);
    }
  };

  return (
    <>
      <BreadcrumbBanner
        title={PAGE_TITLE}
        image={{
          src: BreadcrumbBannerImage.src,
          srcMobile: BreadcrumbBannerImageTablet.src,
          srcTablet: BreadcrumbBannerImageMobile.src,
          width: 1920,
          height: 520,
          cls: "media media-bg",
          alt: "Banner Image",
          loading: "eager",
        }}
      />

      <div className="careers-page container" style={{ maxWidth: "1280px" }}>


        {/* 2-Column Careers Layout: Left Accordion Filter Sidebar + Right Job Listings */}
        <div className="careers-layout-container" data-aos="fade-up">
          {/* Left Sidebar */}
          <aside className="filter-sidebar">
            <div className="filter-sidebar-header">
              <h3 className="filter-sidebar-title">Filters</h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="filter-clear-btn"
                  title="Clear all active filters"
                >
                  <span>Clear filters</span>
                  <RotateCcwIcon size={12} />
                </button>
              )}
            </div>

            {/* Accordion 1: Location */}
            <div className="filter-accordion-item">
              <button
                type="button"
                className="filter-accordion-header"
                onClick={() => toggleSection("location")}
                aria-expanded={expandedSections.location}
              >
                <span className="filter-accordion-title">Location</span>
                <span className="filter-accordion-toggle">
                  {expandedSections.location ? "−" : "+"}
                </span>
              </button>

              {expandedSections.location && (
                <div className="filter-accordion-body">
                  <div className="filter-search-wrap">
                    <span className="filter-search-icon">
                      <SearchIcon size={13} />
                    </span>
                    <input
                      type="text"
                      placeholder="Search locations"
                      value={locationSearch}
                      onChange={e => setLocationSearch(e.target.value)}
                      className="filter-search-input"
                    />
                  </div>

                  <div className="filter-options-list">
                    {locationsList.map(loc => {
                      const count = availableFilterOptions.counts?.locations?.[loc] ?? careers.filter(c => c.location === loc).length;
                      const isChecked = selectedLocations.includes(loc);
                      return (
                        <label key={loc} className="filter-checkbox-label">
                          <div className="filter-checkbox-left">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleFilterItem(loc, selectedLocations, setSelectedLocations)}
                            />
                            <span className="filter-option-name" title={loc}>{loc}</span>
                          </div>
                          <span className="filter-count-badge">{count}</span>
                        </label>
                      );
                    })}
                    {locationsList.length === 0 && (
                      <div style={{ fontSize: "12px", color: "#94a3b8", padding: "6px 8px" }}>
                        No locations found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>


            {/* Accordion 3: Job Type */}
            <div className="filter-accordion-item">
              <button
                type="button"
                className="filter-accordion-header"
                onClick={() => toggleSection("jobType")}
                aria-expanded={expandedSections.jobType}
              >
                <span className="filter-accordion-title">Job Type</span>
                <span className="filter-accordion-toggle">
                  {expandedSections.jobType ? "−" : "+"}
                </span>
              </button>

              {expandedSections.jobType && (
                <div className="filter-accordion-body">
                  <div className="filter-options-list">
                    {jobTypesList.map(type => {
                      const count = availableFilterOptions.counts?.types?.[type] ?? careers.filter(c => c.type === type).length;
                      const isChecked = selectedJobTypes.includes(type);
                      return (
                        <label key={type} className="filter-checkbox-label">
                          <div className="filter-checkbox-left">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleFilterItem(type, selectedJobTypes, setSelectedJobTypes)}
                            />
                            <span className="filter-option-name" title={type}>{type}</span>
                          </div>
                          <span className="filter-count-badge">{count}</span>
                        </label>
                      );
                    })}
                    {jobTypesList.length === 0 && (
                      <div style={{ fontSize: "12px", color: "#94a3b8", padding: "6px 8px" }}>
                        No job types found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: Experience */}
            <div className="filter-accordion-item">
              <button
                type="button"
                className="filter-accordion-header"
                onClick={() => toggleSection("experience")}
                aria-expanded={expandedSections.experience}
              >
                <span className="filter-accordion-title">Experience</span>
                <span className="filter-accordion-toggle">
                  {expandedSections.experience ? "−" : "+"}
                </span>
              </button>

              {expandedSections.experience && (
                <div className="filter-accordion-body">
                  <div className="filter-options-list">
                    {experiencesList.map(exp => {
                      const count = availableFilterOptions.counts?.experiences?.[exp] ?? careers.filter(c => c.experience === exp).length;
                      const isChecked = selectedExperiences.includes(exp);
                      return (
                        <label key={exp} className="filter-checkbox-label">
                          <div className="filter-checkbox-left">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleFilterItem(exp, selectedExperiences, setSelectedExperiences)}
                            />
                            <span className="filter-option-name" title={exp}>{exp}</span>
                          </div>
                          <span className="filter-count-badge">{count}</span>
                        </label>
                      );
                    })}
                    {experiencesList.length === 0 && (
                      <div style={{ fontSize: "12px", color: "#94a3b8", padding: "6px 8px" }}>
                        No experience levels listed
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Right Content Column */}
          <div className="careers-content-column">
            {/* Top Bar: Results Count & Sort Dropdown */}
            <div className="careers-results-header">
              <div className="careers-results-count">
                {hasActiveFilters ? (
                  <>
                    {filteredCareers.length} <span>{filteredCareers.length === 1 ? "Result found" : "Results found"}</span>
                  </>
                ) : (
                  <>
                    {filteredCareers.length} <span>{filteredCareers.length === 1 ? "Open Position" : "Open Positions"}</span>
                  </>
                )}
              </div>

              <div className="careers-controls-right">
                <div style={{ position: "relative", minWidth: "220px" }}>
                  <span className="filter-search-icon" style={{ left: "10px" }}>
                    <SearchIcon size={13} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="filter-search-input"
                    style={{ paddingLeft: "30px", fontSize: "13px" }}
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as "newest" | "oldest")}
                  className="careers-sort-select"
                >
                  <option value="newest">Sort by Newest</option>
                  <option value="oldest">Sort by Oldest</option>
                </select>
              </div>
            </div>

            {/* Roles List */}
            <div className="careers-list">
              {loading ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
                  Loading available opportunities...
                </div>
              ) : filteredCareers.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    background: "#ffffff",
                    borderRadius: "14px",
                    border: "1px dashed #cbd5e1",
                  }}
                >
                  <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
                    No active roles matching your selected filters
                  </h3>
                  <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "480px", margin: "0 auto 16px", lineHeight: 1.6 }}>
                    Try unchecking some filters or clearing your search to see more available positions.
                  </p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleClearFilters}
                      className="btn-details"
                      style={{ background: "#f8fafc", padding: "6px 16px", fontSize: "13px" }}
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                paginatedCareers.map((job, idx) => {
                  const jobKey = String(job.id || idx);
                  const isExpanded = Boolean(expandedJobIds[jobKey]);
                  return (
                    <div key={jobKey} className="job-card" data-aos="fade-up" data-aos-delay={`${(idx % 4) + 1}00`}>
                      <div className="job-card-header">
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={{ fontSize: "17px", fontWeight: "600", color: "#1c2539", margin: "0 0 5px", lineHeight: 1.35, letterSpacing: "-0.01em" }}>
                            {job.title}
                          </h3>
                          <p style={{ fontSize: "13.5px", color: "#475569", margin: "0 0 8px", lineHeight: 1.5 }}>
                            {job.overview}
                          </p>

                          <div className="job-badges">
                            <span className="job-badge badge-dept">{job.department}</span>
                            <span className="job-badge badge-type">{job.type}</span>
                            <span className="job-badge">{job.location}</span>
                            {job.experience && (
                              <span className="job-badge">{job.experience}</span>
                            )}
                            {job.salary && (
                              <span className="job-badge">{job.salary}</span>
                            )}
                          </div>
                        </div>

                        <div className="job-card-actions">
                          <button
                            type="button"
                            onClick={() => toggleJobExpand(jobKey)}
                            className={`job-expand-toggle-btn ${isExpanded ? "expanded" : ""}`}
                            title={isExpanded ? "Minimize details" : "View details"}
                            aria-label={isExpanded ? "Minimize details" : "View details"}
                            aria-expanded={isExpanded}
                          >
                            {isExpanded ? "−" : "+"}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Details Inline */}
                      {isExpanded && (
                        <div className="job-card-expanded">
                          {job.responsibilities && job.responsibilities.length > 0 && (
                            <div className="job-expanded-block">
                              <h4 className="job-expanded-title">Key Responsibilities</h4>
                              <ul className="job-expanded-bullets">
                                {job.responsibilities.map((r, i) => (
                                  <li key={i}>{r}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {job.requirements && job.requirements.length > 0 && (
                            <div className="job-expanded-block">
                              <h4 className="job-expanded-title">Requirements & Qualifications</h4>
                              <ul className="job-expanded-bullets">
                                {job.requirements.map((r, i) => (
                                  <li key={i}>{r}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {job.benefits && job.benefits.length > 0 && (
                            <div className="job-expanded-block">
                              <h4 className="job-expanded-title">What We Offer</h4>
                              <ul className="job-expanded-bullets">
                                {job.benefits.map((b, i) => (
                                  <li key={i}>{b}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="job-expanded-actions">
                            <button
                              type="button"
                              onClick={() => {
                                setApplyingJob(job);
                                setAppSuccessMsg("");
                                setAppErrorMsg("");
                              }}
                              className="btn-apply"
                            >
                              Apply Now →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* CONDITIONAL SMART PAGINATION */}
            {totalPages > 1 && (
              <div
                className="saas-pagination"
                style={{
                  marginTop: "24px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
                }}
              >
                <div style={{ fontSize: "14px", color: "#64748b" }}>
                  Showing{" "}
                  <strong>{startIndex + 1}</strong> to{" "}
                  <strong>{Math.min(safeCurrentPage * itemsPerPage, filteredCareers.length)}</strong> of{" "}
                  <strong>{filteredCareers.length}</strong> roles
                </div>

                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage(prev => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
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
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 380, behavior: "smooth" });
                      }}
                      className={`page-btn ${pageNum === safeCurrentPage ? "active" : ""}`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage(prev => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    disabled={safeCurrentPage === totalPages}
                    className="page-btn"
                    title="Next page"
                    aria-label="Next page"
                  >
                    <ChevronRightIcon size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>



        {/* APPLY MODAL */}
        {applyingJob && (
          <div
            className="career-modal-backdrop"
            onClick={e => {
              if (e.target === e.currentTarget) {
                setApplyingJob(null);
                setAppSuccessMsg("");
                setAppErrorMsg("");
              }
            }}
          >
            <div className="career-modal-dialog apply-modal" onClick={e => e.stopPropagation()}>

              {/* Modal Header */}
              <div className="apply-modal-header">
                <div className="apply-modal-title-wrap">
                  <h2 className="apply-modal-title">
                    Apply for {applyingJob.title}
                  </h2>
                  <div className="apply-role-pills">
                    <span className="apply-role-pill dept">{applyingJob.department}</span>
                    <span className="apply-role-pill">
                      <MapPinIcon size={12} /> {applyingJob.location}
                    </span>
                    <span className="apply-role-pill">
                      <ClockIcon size={12} /> {applyingJob.type}
                    </span>
                    {applyingJob.experience && (
                      <span className="apply-role-pill">
                        <TargetIcon size={12} /> {applyingJob.experience}
                      </span>
                    )}
                    {applyingJob.salary && (
                      <span className="apply-role-pill">
                        <BanknoteIcon size={12} /> {applyingJob.salary}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setApplyingJob(null);
                    setAppSuccessMsg("");
                    setAppErrorMsg("");
                  }}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <CloseIcon size={16} />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="apply-modal-body">
                {appSuccessMsg ? (
                  <div className="apply-success-box">
                    <div className="apply-success-icon-wrap">
                      <CheckCircleIcon size={34} />
                    </div>
                    <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>
                      Application Received! 🎉
                    </h3>
                    <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, maxWidth: "460px", margin: "0 auto 20px" }}>
                      Thank you for applying for <strong>{applyingJob.title}</strong> at Saanvi Technologies.
                    </p>

                    <button
                      onClick={() => setApplyingJob(null)}
                      className="apply-btn-submit"
                      style={{ margin: "0 auto", display: "inline-flex" }}
                    >
                      Done & Back to Jobs
                    </button>
                  </div>
                ) : (
                  <form id="public-career-apply-form" onSubmit={handleApplySubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {appErrorMsg && (
                      <div style={{ padding: "12px 16px", borderRadius: "8px", background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", fontSize: "13px", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px" }}>
                        <CloseIcon size={14} />
                        {appErrorMsg}
                      </div>
                    )}

                    {/* SECTION 1: Personal & Contact Details */}
                    <div className="apply-section-card">
                      <div className="apply-section-header">
                        <div className="apply-step-badge">1</div>
                        <h4 className="apply-section-title">Personal Information</h4>
                        <span className="apply-section-sub">* Required fields</span>
                      </div>

                      <div className="apply-form-grid">
                        <div>
                          <div className="career-form-label-row">
                            <span>Full Name <span className="req">*</span></span>
                          </div>
                          <div className="input-icon-wrap">
                            <input
                              type="text"
                              className="career-form-input"
                              placeholder="e.g. Rahul Sharma"
                              value={appForm.name}
                              onChange={e => setAppForm({ ...appForm, name: e.target.value })}
                              required
                            />
                            <span className="input-icon-left">
                              <UserIcon size={15} />
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="career-form-label-row">
                            <span>Email Address <span className="req">*</span></span>
                          </div>
                          <div className="input-icon-wrap">
                            <input
                              type="email"
                              className="career-form-input"
                              placeholder="e.g. rahul@example.com"
                              value={appForm.email}
                              onChange={e => setAppForm({ ...appForm, email: e.target.value })}
                              required
                            />
                            <span className="input-icon-left">
                              <MailIcon size={15} />
                            </span>
                          </div>
                        </div>

                        <div style={{ gridColumn: "span 2" }}>
                          <div className="career-form-label-row">
                            <span>Mobile Number <span className="req">*</span></span>
                            <span className="hint">10 digits max</span>
                          </div>
                          <div className="input-icon-wrap">
                            <input
                              type="tel"
                              className="career-form-input"
                              placeholder="e.g. 9876543210"
                              value={appForm.phone}
                              maxLength={10}
                              pattern="[0-9]{10}"
                              inputMode="numeric"
                              onChange={e => {
                                const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setAppForm({ ...appForm, phone: digits });
                              }}
                              required
                            />
                            <span className="input-icon-left">
                              <PhoneIcon size={15} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Professional Profiles */}
                    <div className="apply-section-card">
                      <div className="apply-section-header">
                        <div className="apply-step-badge">2</div>
                        <h4 className="apply-section-title">Professional Profiles</h4>
                        <span className="apply-section-sub">Optional</span>
                      </div>

                      <div className="apply-form-grid">
                        <div>
                          <div className="career-form-label-row">
                            <span>LinkedIn Profile</span>
                          </div>
                          <div className="input-icon-wrap">
                            <input
                              type="url"
                              className="career-form-input"
                              placeholder="https://linkedin.com/in/username"
                              value={appForm.linkedin}
                              onChange={e => setAppForm({ ...appForm, linkedin: e.target.value })}
                            />
                            <span className="input-icon-left">
                              <LinkedinIcon size={15} />
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="career-form-label-row">
                            <span>Portfolio / GitHub</span>
                          </div>
                          <div className="input-icon-wrap">
                            <input
                              type="url"
                              className="career-form-input"
                              placeholder="https://github.com/... or portfolio"
                              value={appForm.portfolio}
                              onChange={e => setAppForm({ ...appForm, portfolio: e.target.value })}
                            />
                            <span className="input-icon-left">
                              <GlobeIcon size={15} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: Resume & Documents */}
                    <div className="apply-section-card">
                      <div className="apply-section-header">
                        <div className="apply-step-badge">3</div>
                        <h4 className="apply-section-title">Resume & Documents</h4>
                        <span className="apply-section-sub"><span className="req">*</span> Upload or Link</span>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {!resumeFile ? (
                          <label
                            className={`modern-resume-zone ${isDragging ? "dragging" : ""}`}
                            onDragOver={e => {
                              e.preventDefault();
                              setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={e => {
                              e.preventDefault();
                              setIsDragging(false);
                              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                const file = e.dataTransfer.files[0];
                                if (file.size > 10 * 1024 * 1024) {
                                  setAppErrorMsg("Resume file size must be under 10MB.");
                                  return;
                                }
                                setResumeFile(file);
                                setAppErrorMsg("");
                              }
                            }}
                          >
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              onChange={e => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  if (file.size > 10 * 1024 * 1024) {
                                    setAppErrorMsg("Resume file size must be under 10MB.");
                                    return;
                                  }
                                  setResumeFile(file);
                                  setAppErrorMsg("");
                                }
                              }}
                              style={{ display: "none" }}
                            />
                            <div className="resume-cloud-icon-circle">
                              <UploadIcon size={24} />
                            </div>
                            <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>
                              Drop your resume here, or <span style={{ color: "#093d64", textDecoration: "underline" }}>browse files</span>
                            </div>
                            <div style={{ fontSize: "12px", color: "#64748b" }}>
                              PDF, DOC, DOCX up to 10MB
                            </div>
                            <div className="resume-format-chips">
                              <span className="format-chip">PDF</span>
                              <span className="format-chip">DOCX</span>
                              <span className="format-chip">DOC</span>
                            </div>
                          </label>
                        ) : (
                          <div className="modern-resume-selected">
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                              <div className="resume-file-icon-box">
                                <FileTextIcon size={22} />
                              </div>
                              <div className="resume-file-details">
                                <div className="resume-file-name" title={resumeFile.name}>
                                  {resumeFile.name}
                                </div>
                                <div className="resume-file-meta">
                                  ✓ Ready for review • {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setResumeFile(null)}
                              className="resume-remove-btn"
                            >
                              Remove
                            </button>
                          </div>
                        )}

                        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "4px 0" }}>
                          <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }}></div>
                          <span style={{ fontSize: "11px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            or paste resume link
                          </span>
                          <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }}></div>
                        </div>

                        <div className="input-icon-wrap">
                          <input
                            type="url"
                            className="career-form-input"
                            placeholder="Google Drive, Dropbox, or OneDrive resume share link..."
                            value={appForm.resumeUrl}
                            onChange={e => setAppForm({ ...appForm, resumeUrl: e.target.value })}
                          />
                          <span className="input-icon-left">
                            <GlobeIcon size={15} />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: Short Note */}
                    <div className="apply-section-card">
                      <div className="apply-section-header">
                        <div className="apply-step-badge">4</div>
                        <h4 className="apply-section-title">Brief Note (Optional)</h4>
                        <span className="apply-section-sub">Why you?</span>
                      </div>

                      <div>
                        <textarea
                          className="career-form-textarea"
                          rows={3}
                          placeholder="Tell us what excites you about this role at Saanvi Technologies and what sets you apart..."
                          value={appForm.coverLetter}
                          onChange={e => setAppForm({ ...appForm, coverLetter: e.target.value })}
                          style={{ resize: "vertical" }}
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Sticky Footer */}
              {!appSuccessMsg && (
                <div className="apply-modal-footer">
                  <div className="apply-footer-buttons">
                    <button
                      type="button"
                      onClick={() => setApplyingJob(null)}
                      className="apply-btn-cancel"
                      disabled={submittingApp}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      form="public-career-apply-form"
                      className="apply-btn-submit"
                      disabled={submittingApp}
                    >
                      {submittingApp ? (
                        <>
                          <SpinnerIcon size={16} /> <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          Submit Application <SendIcon size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification at bottom right */}
      {toast && (
        <div
          className={`saas-toast ${toast.type}`}
          role="alert"
          style={{
            maxWidth: "440px",
            lineHeight: "1.45",
            zIndex: 99999,
            cursor: "pointer",
          }}
          onClick={() => setToast(null)}
          title="Click to dismiss"
        >
          {toast.type === "success" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : toast.type === "warning" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          <span>{toast.text}</span>
        </div>
      )}
    </>
  );
}
