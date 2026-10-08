"use client";

import { useState } from "react";
import Link from "next/link";
import "@/styles/tech-ecosystem.css";
import { TechEcosystemDataType, TechItem } from "@/data/sections/techEcosystemData";

const renderTechIcon = (iconType: string, color: string) => {
  switch (iconType) {
    case "aws":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M12.784 14.544c-.792.384-1.896.648-3.072.648-2.616 0-4.152-1.392-4.152-3.696 0-2.424 1.776-3.888 4.416-3.888 1.056 0 2.016.216 2.808.576v6.36zm2.352-8.088c-1.392-.576-3.216-.864-5.04-.864-4.512 0-7.392 2.472-7.392 6.552 0 3.936 2.688 6.312 6.84 6.312 1.944 0 3.768-.432 5.04-1.08v-2.184c-1.128.6-2.616.96-3.96.96-2.688 0-4.32-1.344-4.32-3.648 0-2.16 1.512-3.6 4.104-3.6 1.488 0 3.096.384 4.728 1.08V6.456zm3.336 9.888a15.82 15.82 0 0 1-13.92 4.104c-.384-.048-.744.144-.816.528-.072.384.144.744.528.816 4.968 1.008 10.368-.24 14.544-3.672.312-.264.336-.72.072-1.032-.264-.312-.72-.336-1.032-.072z"/>
        </svg>
      );
    case "azure":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M13.05 4.24l-6.8 11.96H1.5l8.72-15.35a1.64 1.64 0 0 1 2.83 0l8.72 15.35h-4.75l-6.8-11.96zm4.98 9.38l-2.88 5.07a1.64 1.64 0 0 1-1.42.83H1.5l3.83-6.72h12.7z"/>
        </svg>
      );
    case "gcp":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
        </svg>
      );
    case "kubernetes":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.2l7.8 4.3-3.1 1.7-4.7-2.6V4.2zm-1.5 0v3.4L5.8 10.2 2.7 8.5 10.5 4.2zm-6.8 5.7l3.1 1.7v5.2l-3.1-1.7V9.9zm4.6 2.5l3.2 1.8-3.2 1.8-3.2-1.8 3.2-1.8zm5.4 9.4l-7.8-4.3 3.1-1.7 4.7 2.6v3.4zm1.5 0v-3.4l4.7-2.6 3.1 1.7-7.8 4.3zm6.8-5.7l-3.1-1.7v-5.2l3.1 1.7v5.2z"/>
        </svg>
      );
    case "docker":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.186.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.186V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.186V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.186V9.006a.185.185 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.12a.185.185 0 0 0 .185-.186V9.006a.185.185 0 0 0-.185-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185M23.76 9.89c-.365-1.7-1.745-2.85-3.08-3.04-.37-.05-.73-.02-1.07.08a4.93 4.93 0 0 0-2.61-2.13c-.15-.05-.31.02-.36.17-.06.15.01.32.16.38.74.28 1.4.74 1.93 1.34-1.22.18-2.3.93-2.86 2.02H.86c-.48 0-.86.39-.86.87 0 3.73 1.7 6.44 4.3 7.82 1.83.97 4.14 1.25 6.74 1.25 5.51 0 9.77-2.68 11.83-7.39.38-.85.64-1.76.79-2.67.04-.21.07-.42.1-.63z"/>
        </svg>
      );
    case "terraform":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M1.5 1h6.6v6.6H1.5V1zm7.7 7.7h6.6v6.6H9.2V8.7zm7.7 0h6.6v6.6h-6.6V8.7zm-7.7 7.7h6.6V23H9.2v-6.6z"/>
        </svg>
      );
    case "python":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M11.91 0C5.9 0 6.27 2.61 6.27 2.61l.01 2.7h5.72v.81H3.97S0 5.68 0 11.71c0 6.02 3.47 5.82 3.47 5.82h2.07v-2.91s-.11-3.47 3.42-3.47h5.86s3.32.05 3.32-3.26V2.61S18.52 0 11.91 0zm-3.23 1.79c.62 0 1.12.5 1.12 1.12 0 .62-.5 1.12-1.12 1.12-.62 0-1.12-.5-1.12-1.12 0-.62.5-1.12 1.12-1.12zm3.41 22.21c6.01 0 5.64-2.61 5.64-2.61l-.01-2.7h-5.72v-.81h8.03s3.97.44 3.97-5.59c0-6.02-3.47-5.82-3.47-5.82h-2.07v2.91s.11 3.47-3.42 3.47H8.22s-3.32-.05-3.32 3.26v5.27s-.38 2.62 6.23 2.62zm3.23-1.79c-.62 0-1.12-.5-1.12-1.12 0-.62.5-1.12 1.12-1.12.62 0 1.12.5 1.12 1.12 0 .62-.5 1.12-1.12 1.12z"/>
        </svg>
      );
    case "openai":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zm-1.22-9.467a4.488 4.488 0 0 1 2.362-1.99l-.001.163v5.522a.795.795 0 0 0 .395.684l5.839 3.372-2.02 1.167a.08.08 0 0 1-.077.005L4.04 14.93a4.504 4.504 0 0 1-1.66-6.093zm16.59 3.014l-5.84-3.37v-2.33a.08.08 0 0 1 .033-.062l4.839-2.793a4.494 4.494 0 0 1 6.675 4.66l-.141-.085-4.786-2.76a.79.79 0 0 0-.78 0zm2.01-1.853v5.522a.795.795 0 0 0-.395.684l-5.839 3.372 2.02-1.167a.08.08 0 0 1 .077-.005l4.839-2.793a4.504 4.504 0 0 1 1.66 6.093 4.488 4.488 0 0 1-2.362 1.99v-.163zm-9.74-3.18l-2.02-1.168a.07.07 0 0 1-.038-.052V3.415a4.504 4.504 0 0 1 7.37 3.454v.163l-4.78 2.76a.79.79 0 0 0-.532.681z"/>
        </svg>
      );
    case "postgresql":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      );
    case "redis":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M22.08 15.65L13.19 21a2.37 2.37 0 0 1-2.38 0L1.92 15.65A1.5 1.5 0 0 1 1.13 14.3V9.7A1.5 1.5 0 0 1 1.92 8.35L10.81 3a2.37 2.37 0 0 1 2.38 0l8.89 5.35a1.5 1.5 0 0 1 .79 1.35v4.6a1.5 1.5 0 0 1-.79 1.35zM12 5.25L4.5 9.75 12 14.25l7.5-4.5L12 5.25z"/>
        </svg>
      );
    case "react":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 2.5c-4.5 0-8.5 4.3-8.5 9.5s4 9.5 8.5 9.5 8.5-4.3 8.5-9.5-4-9.5-8.5-9.5zm0 17.5c-3.6 0-6.8-3.7-6.8-8s3.2-8 6.8-8 6.8 3.7 6.8 8-3.2 8-6.8 8z" transform="rotate(30 12 12)"/>
          <path d="M12 2.5c-4.5 0-8.5 4.3-8.5 9.5s4 9.5 8.5 9.5 8.5-4.3 8.5-9.5-4-9.5-8.5-9.5zm0 17.5c-3.6 0-6.8-3.7-6.8-8s3.2-8 6.8-8 6.8 3.7 6.8 8-3.2 8-6.8 8z" transform="rotate(90 12 12)"/>
          <path d="M12 2.5c-4.5 0-8.5 4.3-8.5 9.5s4 9.5 8.5 9.5 8.5-4.3 8.5-9.5-4-9.5-8.5-9.5zm0 17.5c-3.6 0-6.8-3.7-6.8-8s3.2-8 6.8-8 6.8 3.7 6.8 8-3.2 8-6.8 8z" transform="rotate(150 12 12)"/>
        </svg>
      );
    case "nextjs":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.79 17.38l-6.66-8.56V17.38H9.37V6.62h1.88l6.98 8.97V6.62h1.76v10.76h-2.2z"/>
        </svg>
      );
    case "typescript":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.78 12.87h-3.4v7.71H6.7v-7.71H3.3V10.7h8.98v2.17zm8.43 3.65c-.32.61-.79 1.1-1.4 1.45-.61.36-1.34.54-2.18.54-.86 0-1.61-.17-2.24-.52-.63-.35-1.12-.86-1.46-1.51l2.08-1.28c.36.72.93 1.08 1.7 1.08.41 0 .74-.1.97-.3.23-.2.35-.47.35-.8 0-.25-.08-.47-.23-.65-.16-.18-.41-.35-.76-.51l-1.07-.48c-.86-.39-1.5-.86-1.92-1.43-.42-.57-.63-1.23-.63-1.99 0-.8.25-1.5.76-2.09.5-.59 1.22-.89 2.14-.89.8 0 1.5.17 2.08.52.59.35 1.01.85 1.28 1.48l-2.03 1.2c-.3-.54-.73-.81-1.3-.81-.35 0-.63.09-.84.27-.2.18-.31.42-.31.7 0 .22.08.41.23.57.15.16.4.32.74.47l1.05.47c.96.43 1.66.94 2.11 1.54.44.59.66 1.3.66 2.12 0 .86-.25 1.62-.77 2.27z"/>
        </svg>
      );
    case "nodejs":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M12 1.5L2 7.27v11.54L12 24.54l10-5.73V7.27L12 1.5zm7.84 15.77L12 21.72l-7.84-4.45V8.81L12 4.36l7.84 4.45v8.46z"/>
        </svg>
      );
    case "flutter":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zm0 10.857L8.457 16.714l5.857 5.857H21.686L15.829 16.714l5.857-5.857h-7.372z"/>
        </svg>
      );
    case "graphql":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.31L5.34 8.15v7.7L12 19.69l6.66-3.84v-7.7L12 4.31zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/>
        </svg>
      );
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

const TechEcosystem = ({ data }: { data: TechEcosystemDataType }) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { subheading, heading, description, categories, technologies, footerNote } = data;

  const filteredTechs =
    activeTab === "all"
      ? technologies
      : technologies.filter((t) => t.category === activeTab);

  return (
    <section className="section-tech-ecosystem">
      <div className="container">
        {/* Section Header */}
        <div className="tech-ecosystem-header" data-aos="fade-up">
          {subheading && (
            <div className="subheading">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l-10 5 10 5 10-5-10-5z" />
              </svg>
              <span>{subheading}</span>
            </div>
          )}
          {heading && <h2 className="heading">{heading}</h2>}
          {description && <p className="description">{description}</p>}
        </div>

        {/* Category Filter Tabs */}
        {categories && (
          <div className="tech-filter-nav" data-aos="fade-up" data-aos-delay="100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`tech-filter-btn ${activeTab === cat.id ? "active" : ""}`}
                onClick={() => setActiveTab(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Technologies Grid */}
        <div className="tech-grid">
          {filteredTechs.map((item: TechItem, index: number) => (
            <div
              key={item.id}
              className="tech-card"
              data-aos="fade-up"
              data-aos-delay={((index % 4) * 60).toString()}
            >
              <div className="tech-card-top">
                <div className="tech-icon-box">
                  {renderTechIcon(item.iconType, item.color)}
                </div>
                {item.badge && <span className="tech-badge">{item.badge}</span>}
              </div>
              <h3 className="tech-name">{item.name}</h3>
              <span className="tech-category-tag">{item.categoryLabel}</span>
              <p className="tech-desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Footer Note Banner */}
        {footerNote && (
          <div className="tech-footer-banner" data-aos="fade-up">
            <div className="tech-footer-content">
              <div className="tech-footer-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </div>
              <div className="tech-footer-text">
                <span className="highlight">{footerNote.highlight}</span>
                <p className="sub">{footerNote.text}</p>
              </div>
            </div>
            <Link href={footerNote.buttonUrl} className="tech-footer-btn">
              <span>{footerNote.buttonText}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TechEcosystem;
