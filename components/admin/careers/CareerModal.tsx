import React, { useEffect } from "react";
import { CareerStatus } from "@/types/career";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  FileTextIcon,
  PlusIcon,
  CloseIcon,
  CheckIcon,
  AlertCircleIcon,
  SparklesIcon,
  ListCheckIcon,
  GiftIcon,
  TrashIcon,
  EditIcon,
} from "./CareerIcons";

export interface CareerFormData {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  status: CareerStatus;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  is_active: boolean;
}

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingId: number | string | null;
  formData: CareerFormData;
  setFormData: React.Dispatch<React.SetStateAction<CareerFormData>>;
  formSubmitting: boolean;
  feedbackMsg: { type: "success" | "error"; text: string } | null;
  onSubmit: (e: React.FormEvent) => void;
}

const BENEFIT_SUGGESTIONS = [
  "Comprehensive Health & Medical Insurance",
  "Flexible Hybrid / Remote Work Options",
  "Annual Learning & Certification Allowance",
  "Performance-based Year-end Bonus",
  "Generous Paid Time Off & Parental Leave",
  "Latest M-Series MacBook & Home Office Setup",
  "Provident Fund (PF) & Gratuity Benefits",
  "Team Retreats & Annual Gatherings",
];

export const CareerModal: React.FC<CareerModalProps> = ({
  isOpen,
  onClose,
  editingId,
  formData,
  setFormData,
  formSubmitting,
  feedbackMsg,
  onSubmit,
}) => {
  // Keyboard Escape listener & Body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleArrayFieldChange = (
    field: "responsibilities" | "requirements" | "benefits",
    index: number,
    val: string
  ) => {
    const list = [...formData[field]];
    list[index] = val;
    setFormData(prev => ({ ...prev, [field]: list }));
  };

  const addArrayFieldItem = (field: "responsibilities" | "requirements" | "benefits") => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayFieldItem = (
    field: "responsibilities" | "requirements" | "benefits",
    index: number
  ) => {
    const list = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: list.length ? list : [""] }));
  };

  const handleToggleBenefitSuggestion = (suggestion: string) => {
    const current = formData.benefits.map(b => b.trim());
    if (current.includes(suggestion)) {
      const filtered = current.filter(b => b !== suggestion);
      setFormData(prev => ({
        ...prev,
        benefits: filtered.length ? filtered : [""],
      }));
    } else {
      if (current.length === 1 && current[0] === "") {
        setFormData(prev => ({ ...prev, benefits: [suggestion] }));
      } else {
        setFormData(prev => ({ ...prev, benefits: [...prev.benefits, suggestion] }));
      }
    }
  };

  return (
    <div
      className="career-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="career-modal-dialog wide" onClick={e => e.stopPropagation()}>
        {/* Sticky Modal Header */}
        <div className="modal-header-sticky">
          <div className="modal-header-info">
            <div className="modal-header-icon-wrap">
              {editingId ? <EditIcon size={20} /> : <BriefcaseIcon size={20} />}
            </div>
            <div>
              <h2 id="modal-title" className="modal-header-title">
                {editingId ? "Edit Job Posting" : "Post a New Job Role"}
              </h2>
              <p className="modal-header-sub">
                {editingId 
                  ? `Update requirements, compensation, and publishing visibility for "${formData.title || "this role"}".`
                  : "Configure position details and publishing status to recruit top talent."}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="modal-close-btn" 
            aria-label="Close modal"
            title="Close (Esc)"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Form Content - Scrollable Body */}
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
          <div className="modal-body-scrollable">
            {feedbackMsg && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  marginBottom: "18px",
                  background: feedbackMsg.type === "error" ? "#fef2f2" : "#ecfdf5",
                  color: feedbackMsg.type === "error" ? "#b91c1c" : "#065f46",
                  fontSize: "13px",
                  fontWeight: "500",
                  border: `1px solid ${feedbackMsg.type === "error" ? "#fecaca" : "#a7f3d0"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                {feedbackMsg.type === "error" ? <AlertCircleIcon size={16} /> : <CheckIcon size={16} />}
                <span>{feedbackMsg.text}</span>
              </div>
            )}

            {/* Section 1: Basic Role Information */}
            <div className="modal-form-section">
              <div className="modal-section-header">
                <div className="modal-section-icon">
                  <BriefcaseIcon size={15} />
                </div>
                <div>
                  <h3 className="modal-section-title">1. Position &amp; Logistics</h3>
                  <p className="modal-section-desc">Specify role title, team department, location model, and compensation.</p>
                </div>
              </div>

              <div className="career-form-grid-2">
                <div className="career-form-group">
                  <label className="career-form-label">
                    <span>Job Title <span style={{ color: "#ef4444" }}>*</span></span>
                    <span className="career-form-hint">Publicly displayed</span>
                  </label>
                  <input
                    type="text"
                    className="career-form-input"
                    placeholder="e.g. Senior Full-Stack Engineer"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="career-form-group">
                  <label className="career-form-label">
                    <span>Department <span style={{ color: "#ef4444" }}>*</span></span>
                  </label>
                  <select
                    className="career-form-select"
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    required
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Management">Management</option>
                    <option value="Design">Design</option>
                    <option value="QA & Testing">QA & Testing</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>
              </div>

              <div className="career-form-grid-4">
                <div className="career-form-group">
                  <label className="career-form-label">
                    <span>Workplace &amp; Location <span style={{ color: "#ef4444" }}>*</span></span>
                  </label>
                  <input
                    type="text"
                    className="career-form-input"
                    placeholder="e.g. Bengaluru, India (Hybrid) or Remote"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="career-form-group">
                  <label className="career-form-label">
                    <span>Employment Type <span style={{ color: "#ef4444" }}>*</span></span>
                  </label>
                  <select
                    className="career-form-select"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="career-form-group">
                  <label className="career-form-label">
                    <span>Experience Level</span>
                    <span className="career-form-hint">Optional</span>
                  </label>
                  <input
                    type="text"
                    className="career-form-input"
                    placeholder="e.g. 3-5 Years"
                    value={formData.experience}
                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>

                <div className="career-form-group">
                  <label className="career-form-label">
                    <span>Compensation / Salary</span>
                    <span className="career-form-hint">Optional</span>
                  </label>
                  <input
                    type="text"
                    className="career-form-input"
                    placeholder="e.g. Competitive / Best in Industry"
                    value={formData.salary}
                    onChange={e => setFormData({ ...formData, salary: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Role Overview */}
            <div className="modal-form-section">
              <div className="modal-section-header">
                <div className="modal-section-icon">
                  <FileTextIcon size={15} />
                </div>
                <div>
                  <h3 className="modal-section-title">2. Role Overview &amp; Mission</h3>
                  <p className="modal-section-desc">Provide a high-impact summary of the role, team context, and opportunities.</p>
                </div>
              </div>

              <div className="career-form-group">
                <label className="career-form-label">
                  <span>Role Summary / Overview <span style={{ color: "#ef4444" }}>*</span></span>
                  <span className="career-form-hint">Shown in listings and search snippets</span>
                </label>
                <textarea
                  className="career-form-textarea"
                  rows={3}
                  placeholder="Provide an engaging summary of the candidate's responsibilities, core mission, and why Saanvi Technologies is the ideal environment to build this..."
                  value={formData.overview}
                  onChange={e => setFormData({ ...formData, overview: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Section 3: Responsibilities */}
            <div className="modal-form-section">
              <div className="modal-section-header">
                <div className="modal-section-icon">
                  <ListCheckIcon size={15} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 className="modal-section-title">
                      3. Key Responsibilities ({formData.responsibilities.filter(r => r.trim()).length})
                    </h3>
                    <button
                      type="button"
                      onClick={() => addArrayFieldItem("responsibilities")}
                      className="add-array-item-btn"
                    >
                      <PlusIcon size={13} />
                      <span>Add Item</span>
                    </button>
                  </div>
                  <p className="modal-section-desc">Clear bulleted duties and core expectations.</p>
                </div>
              </div>

              <div>
                {formData.responsibilities.map((resp, i) => (
                  <div key={i} className="array-item-row">
                    <div className="array-index-badge">{String(i + 1).padStart(2, "0")}</div>
                    <input
                      type="text"
                      className="career-form-input"
                      placeholder={`Responsibility #${i + 1} (e.g. Architect and scale web applications using modern cloud stacks)`}
                      value={resp}
                      onChange={e => handleArrayFieldChange("responsibilities", i, e.target.value)}
                    />
                    {formData.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayFieldItem("responsibilities", i)}
                        className="modal-close-btn"
                        title="Remove item"
                      >
                        <TrashIcon size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Requirements */}
            <div className="modal-form-section">
              <div className="modal-section-header">
                <div className="modal-section-icon">
                  <CheckIcon size={15} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 className="modal-section-title">
                      4. Qualifications &amp; Skills ({formData.requirements.filter(r => r.trim()).length})
                    </h3>
                    <button
                      type="button"
                      onClick={() => addArrayFieldItem("requirements")}
                      className="add-array-item-btn"
                    >
                      <PlusIcon size={13} />
                      <span>Add Item</span>
                    </button>
                  </div>
                  <p className="modal-section-desc">Technical background, required skills, and domain experience.</p>
                </div>
              </div>

              <div>
                {formData.requirements.map((req, i) => (
                  <div key={i} className="array-item-row">
                    <div className="array-index-badge">{String(i + 1).padStart(2, "0")}</div>
                    <input
                      type="text"
                      className="career-form-input"
                      placeholder={`Requirement #${i + 1} (e.g. 3+ years experience with React, Next.js, and TypeScript)`}
                      value={req}
                      onChange={e => handleArrayFieldChange("requirements", i, e.target.value)}
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayFieldItem("requirements", i)}
                        className="modal-close-btn"
                        title="Remove item"
                      >
                        <TrashIcon size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Benefits & Suggestion Chips */}
            <div className="modal-form-section">
              <div className="modal-section-header">
                <div className="modal-section-icon">
                  <GiftIcon size={15} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 className="modal-section-title">
                      5. Perks &amp; Benefits ({formData.benefits.filter(b => b.trim()).length})
                    </h3>
                    <button
                      type="button"
                      onClick={() => addArrayFieldItem("benefits")}
                      className="add-array-item-btn"
                    >
                      <PlusIcon size={13} />
                      <span>Add Custom Benefit</span>
                    </button>
                  </div>
                  <p className="modal-section-desc">Click suggestions below or type custom offerings.</p>
                </div>
              </div>

              {/* Quick-add suggestions */}
              <div style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b", marginBottom: "6px" }}>
                  Quick-Add Suggestions (click to add/remove):
                </div>
                <div className="benefit-chips-row">
                  {BENEFIT_SUGGESTIONS.map(sugg => {
                    const isAdded = formData.benefits.map(b => b.trim()).includes(sugg);
                    return (
                      <button
                        type="button"
                        key={sugg}
                        onClick={() => handleToggleBenefitSuggestion(sugg)}
                        className={`benefit-chip ${isAdded ? "added" : ""}`}
                        title={isAdded ? "Click to remove" : "Click to add"}
                      >
                        {isAdded ? <CheckIcon size={11} /> : <PlusIcon size={11} />}
                        <span>{sugg}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                {formData.benefits.map((ben, i) => (
                  <div key={i} className="array-item-row">
                    <div className="array-index-badge">{String(i + 1).padStart(2, "0")}</div>
                    <input
                      type="text"
                      className="career-form-input"
                      placeholder={`Perk #${i + 1} (e.g. Comprehensive Family Health Insurance)`}
                      value={ben}
                      onChange={e => handleArrayFieldChange("benefits", i, e.target.value)}
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayFieldItem("benefits", i)}
                        className="modal-close-btn"
                        title="Remove item"
                      >
                        <TrashIcon size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6: Publishing Visibility */}
            <div className="modal-form-section">
              <div className="modal-section-header">
                <div className="modal-section-icon">
                  <SparklesIcon size={15} />
                </div>
                <div>
                  <h3 className="modal-section-title">6. Publishing &amp; Visibility Status</h3>
                  <p className="modal-section-desc">Select how this job opening should appear publicly on Saanvi Technologies Careers.</p>
                </div>
              </div>

              <div className="status-cards-grid">
                {/* Published */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: "published", is_active: true })}
                  className={`status-select-card ${formData.status === "published" ? "selected published" : ""}`}
                >
                  <div className="status-select-card-head">
                    <span className="status-select-card-title" style={{ color: "#065f46" }}>
                      <span className="status-dot published" />
                      <span>Published</span>
                    </span>
                    {formData.status === "published" && (
                      <span style={{ color: "#10b981", display: "flex", alignItems: "center" }}>
                        <CheckCircleIcon size={16} />
                      </span>
                    )}
                  </div>
                  <p className="status-select-card-sub">
                    Live on the public careers page immediately. Candidates can view details and submit applications.
                  </p>
                </button>

                {/* Draft */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: "draft", is_active: false })}
                  className={`status-select-card ${formData.status === "draft" ? "selected draft" : ""}`}
                >
                  <div className="status-select-card-head">
                    <span className="status-select-card-title" style={{ color: "#92400e" }}>
                      <span className="status-dot draft" />
                      <span>Draft</span>
                    </span>
                    {formData.status === "draft" && (
                      <span style={{ color: "#f59e0b", display: "flex", alignItems: "center" }}>
                        <CheckCircleIcon size={16} />
                      </span>
                    )}
                  </div>
                  <p className="status-select-card-sub">
                    Saved privately for admin review. Hidden from the public website until you choose to publish.
                  </p>
                </button>

                {/* Paused */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: "paused", is_active: false })}
                  className={`status-select-card ${formData.status === "paused" ? "selected paused" : ""}`}
                >
                  <div className="status-select-card-head">
                    <span className="status-select-card-title" style={{ color: "#475569" }}>
                      <span className="status-dot paused" />
                      <span>Paused</span>
                    </span>
                    {formData.status === "paused" && (
                      <span style={{ color: "#64748b", display: "flex", alignItems: "center" }}>
                        <CheckCircleIcon size={16} />
                      </span>
                    )}
                  </div>
                  <p className="status-select-card-sub">
                    Applications temporarily on hold. The posting remains in your portal but is suspended.
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Modal Footer (Target status omitted as requested) */}
          <div className="modal-footer-sticky" style={{ justifyContent: "flex-end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-details"
                disabled={formSubmitting}
                style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "13px" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-apply"
                disabled={formSubmitting}
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  padding: "8px 20px", 
                  borderRadius: "8px", 
                  fontSize: "13px",
                  fontWeight: "600",
                  background: "#f98e55",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {formSubmitting ? (
                  <span>Saving...</span>
                ) : editingId ? (
                  <>
                    <CheckIcon size={15} />
                    <span>Update Job Role</span>
                  </>
                ) : (
                  <>
                    <PlusIcon size={15} />
                    <span>Save &amp; Publish Role</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
