import React from "react";

interface AdminLoginCardProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  authError: string;
  onLogin: (e: React.FormEvent) => void;
}

export const AdminLoginCard: React.FC<AdminLoginCardProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  authError,
  onLogin,
}) => {
  return (
    <div 
      style={{ 
        minHeight: "100vh", 
        background: "#f0f0f1", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "40px 20px",
        fontFamily: 'var(--font-body--family), "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        boxSizing: "border-box"
      }}
    >
      {/* Brand Logo at Top */}
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <a href="/" title="Saanvi Technologies" style={{ display: "inline-block" }}>
          <img 
            src="/img/logo-white.webp" 
            alt="Saanvi Technologies" 
            style={{ height: "48px", width: "auto", objectFit: "contain", display: "block" }} 
          />
        </a>
      </div>

      {/* Clean Login Card */}
      <div 
        style={{ 
          width: "100%", 
          maxWidth: "340px", 
          background: "#ffffff", 
          border: "1px solid #c3c4c7", 
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)", 
          padding: "26px 24px 24px", 
          boxSizing: "border-box" 
        }}
      >
        {authError && (
          <div
            style={{
              borderLeft: "4px solid #d63638",
              background: "#ffffff",
              boxShadow: "0 1px 1px 0 rgba(0,0,0,.1)",
              padding: "10px 12px",
              marginBottom: "16px",
              fontSize: "13px",
              color: "#3c434a",
            }}
          >
            {authError}
          </div>
        )}

        <form onSubmit={onLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label 
              style={{ 
                display: "block", 
                fontSize: "14px", 
                color: "#2c3338", 
                marginBottom: "4px", 
                fontWeight: "400" 
              }}
            >
              Username or Email Address
            </label>
            <input
              type="text"
              name="username"
              id="user_login"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              autoFocus
              required
              style={{
                width: "100%",
                height: "36px",
                minHeight: "36px",
                padding: "4px 10px",
                fontSize: "14px",
                lineHeight: "20px",
                color: "#2c3338",
                border: "1px solid #8c8f94",
                borderRadius: "4px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = "#2271b1";
                e.currentTarget.style.boxShadow = "0 0 0 1px #2271b1";
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = "#8c8f94";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label 
              style={{ 
                display: "block", 
                fontSize: "14px", 
                color: "#2c3338", 
                marginBottom: "4px", 
                fontWeight: "400" 
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  height: "36px",
                  minHeight: "36px",
                  padding: "4px 34px 4px 10px",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#2c3338",
                  border: "1px solid #8c8f94",
                  borderRadius: "4px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = "#2271b1";
                  e.currentTarget.style.boxShadow = "0 0 0 1px #2271b1";
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = "#8c8f94";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "6px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  color: "#2271b1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
            <label 
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "6px", 
                fontSize: "13px", 
                color: "#2c3338", 
                cursor: "pointer", 
                userSelect: "none" 
              }}
            >
              <input 
                type="checkbox" 
                defaultChecked 
                style={{ 
                  width: "14px", 
                  height: "14px", 
                  minHeight: "14px", 
                  maxHeight: "14px",
                  minWidth: "14px",
                  maxWidth: "14px",
                  margin: "0",
                  padding: "0",
                  accentColor: "#2271b1", 
                  cursor: "pointer",
                  verticalAlign: "middle",
                  flexShrink: 0,
                }} 
              />
              Remember Me
            </label>

            <button
              type="submit"
              style={{
                background: "#2271b1",
                borderColor: "#2271b1",
                borderWidth: "1px",
                borderStyle: "solid",
                color: "#ffffff",
                borderRadius: "4px",
                padding: "0 14px",
                height: "32px",
                minHeight: "32px",
                fontSize: "13px",
                fontFamily: 'var(--font-button--family), var(--font-heading--family), "Poppins", sans-serif',
                fontWeight: "600",
                cursor: "pointer",
                lineHeight: "30px",
                transition: "background 0.15s ease",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#135e96")}
              onMouseLeave={e => (e.currentTarget.style.background = "#2271b1")}
            >
              Log In
            </button>
          </div>
        </form>
      </div>

      {/* Footer Navigation & Credentials */}
      <div style={{ marginTop: "20px", textAlign: "left", width: "100%", maxWidth: "340px", padding: "0 4px" }}>
        <div style={{ marginBottom: "12px" }}>
          <a
            href="/"
            style={{ color: "#2271b1", textDecoration: "none", fontSize: "13px" }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
          >
            ← Go to Home Page
          </a>
        </div>
      </div>
    </div>
  );
};
