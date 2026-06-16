"use client";
import { useState, useEffect } from "react";

const FONT = "'Inter', system-ui, sans-serif";
const RED = "#C41E3A";

export default function Modal({ open, onClose, title, description, fields, submitLabel = "Submit" }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      // Reset when closing
      const t = setTimeout(() => {
        setValues({});
        setSubmitted(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.25s ease",
        fontFamily: FONT,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(32px, 5vw, 56px)",
          maxWidth: 480,
          width: "90%",
          position: "relative",
          animation: "slideUp 0.3s cubic-bezier(0.76,0,0.24,1)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 18,
            color: "#999",
            padding: 4,
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {!submitted ? (
          <>
            {/* Red accent line */}
            <div style={{ width: 28, height: 1, backgroundColor: RED, marginBottom: 24 }} />

            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontWeight: 300,
                color: "#0A0A0A",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h3>

            {description && (
              <p
                style={{
                  margin: "0 0 32px 0",
                  fontSize: 14,
                  color: "#777",
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                {description}
              </p>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {fields?.map((field, i) => (
                <input
                  key={i}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={values[field.name] || ""}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  style={{
                    padding: "13px 20px",
                    backgroundColor: "#FAFAF9",
                    border: "1px solid rgba(0,0,0,0.1)",
                    fontSize: 14,
                    fontFamily: FONT,
                    color: "#0A0A0A",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = RED)}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
                />
              ))}

              <button
                type="submit"
                style={{
                  padding: "14px 28px",
                  backgroundColor: RED,
                  color: "#FFFFFF",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontFamily: FONT,
                  marginTop: 8,
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#A01530")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = RED)}
              >
                {submitLabel}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 28, height: 1, backgroundColor: RED, margin: "0 auto 24px" }} />
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: 24,
                fontWeight: 300,
                color: "#0A0A0A",
                letterSpacing: "-0.02em",
              }}
            >
              Thank you!
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: "#777", fontWeight: 300, lineHeight: 1.7 }}>
              We've received your submission. We'll be in touch soon.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 28,
                padding: "12px 28px",
                backgroundColor: "transparent",
                color: "#0A0A0A",
                border: "1px solid rgba(0,0,0,0.15)",
                cursor: "pointer",
                fontSize: 12,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                fontWeight: 500,
                fontFamily: FONT,
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = RED;
                e.target.style.color = RED;
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(0,0,0,0.15)";
                e.target.style.color = "#0A0A0A";
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
