"use client";

import "@/styles/meet-partners.css";
import Subheading from "../Subheading";
import Heading from "../Heading";
import { MeetPartnersDataType, PartnerItem } from "@/data/sections/meetPartnersData";

const renderPartnerIcon = (iconType: string, color: string) => {
  switch (iconType) {
    case "aws":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M12.784 14.544c-.792.384-1.896.648-3.072.648-2.616 0-4.152-1.392-4.152-3.696 0-2.424 1.776-3.888 4.416-3.888 1.056 0 2.016.216 2.808.576v6.36zm2.352-8.088c-1.392-.576-3.216-.864-5.04-.864-4.512 0-7.392 2.472-7.392 6.552 0 3.936 2.688 6.312 6.84 6.312 1.944 0 3.768-.432 5.04-1.08v-2.184c-1.128.6-2.616.96-3.96.96-2.688 0-4.32-1.344-4.32-3.648 0-2.16 1.512-3.6 4.104-3.6 1.488 0 3.096.384 4.728 1.08V6.456zm3.336 9.888a15.82 15.82 0 0 1-13.92 4.104c-.384-.048-.744.144-.816.528-.072.384.144.744.528.816 4.968 1.008 10.368-.24 14.544-3.672.312-.264.336-.72.072-1.032-.264-.312-.72-.336-1.032-.072z"/>
        </svg>
      );
    case "azure":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M13.05 4.24l-6.8 11.96H1.5l8.72-15.35a1.64 1.64 0 0 1 2.83 0l8.72 15.35h-4.75l-6.8-11.96zm4.98 9.38l-2.88 5.07a1.64 1.64 0 0 1-1.42.83H1.5l3.83-6.72h12.7z"/>
        </svg>
      );
    case "gcp":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
        </svg>
      );
    case "salesforce":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M10.006 4.578a6.002 6.002 0 0 1 5.488 3.562 6.533 6.533 0 0 1 4.346 2.478 6.05 6.05 0 0 1 1.455 3.992c0 3.344-2.71 6.054-6.054 6.054a6.027 6.027 0 0 1-2.268-.44 5.314 5.314 0 0 1-4.043 1.848 5.337 5.337 0 0 1-5.267-4.524A4.708 4.708 0 0 1 0 13.06c0-2.43 1.838-4.428 4.208-4.674a6.012 6.012 0 0 1 5.798-3.808z"/>
        </svg>
      );
    case "oracle":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M16.42 4.07H7.58C3.39 4.07 0 7.47 0 11.65s3.39 7.58 7.58 7.58h8.84c4.19 0 7.58-3.4 7.58-7.58s-3.39-7.58-7.58-7.58zm-.21 11.89H7.79c-2.38 0-4.31-1.93-4.31-4.31s1.93-4.31 4.31-4.31h8.42c2.38 0 4.31 1.93 4.31 4.31s-1.93 4.31-4.31 4.31z"/>
        </svg>
      );
    case "ibm":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M1 4h5v2H1V4zm7 0h8v2H8V4zm10 0h5v2h-5V4zM1 7h5v2H1V7zm7 0h8v2H8V7zm10 0h5v2h-5V7zM1 10h5v2H1v-2zm7 0h8v2H8v-2zm10 0h5v2h-5v-2zM1 13h5v2H1v-2zm7 0h8v2H8v-2zm10 0h5v2h-5v-2zM1 16h5v2H1v-2zm7 0h8v2H8v-2zm10 0h5v2h-5v-2zM1 19h5v2H1v-2zm7 0h8v2H8v-2zm10 0h5v2h-5v-2z"/>
        </svg>
      );
    case "cisco":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M1.5 13.5v-3h1.5v3H1.5zm3.75 2.25v-7.5h1.5v7.5H5.25zm3.75 2.25V6h1.5v12H9zm3.75 2.25V3.75h1.5v16.5h-1.5zm3.75-2.25V6h1.5v12h-1.5zm3.75-2.25v-7.5h1.5v7.5H20.25zm3.75-2.25v-3h1.5v3H24z" transform="translate(-1.5, 0)"/>
        </svg>
      );
    case "sap":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M0 6v12h24V6H0zm7.1 9.6H4.8l-.5 1.5H2.4l3.1-8.2h2.2l3.1 8.2H8.9l-.5-1.5h-1.3zm6.6 1.5h-1.9V8.9h2.9c1.9 0 3 1 3 2.5s-1.1 2.5-3 2.5h-1v3.2zm6.6-4.5h-1.6v-1.6h1.6c.7 0 1.2-.4 1.2-1s-.5-1-1.2-1h-1.6v6.1h-1.9V8.9h3.5c1.7 0 3.1.9 3.1 2.5 0 1.5-1.2 2.4-3.1 2.4z"/>
        </svg>
      );
    case "redhat":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M21.5 13.5c-.3 0-1.8.2-3.8-.9-1.5-.8-3.4-3-4.5-4.8-.4-.7-.9-1.2-1.4-1.2-.4 0-.8.4-1 .8-.5 1.1-.9 3.1-1.8 4.2-1.3 1.5-3.3 1.9-4.8 1.9-2.2 0-3.5-.8-4-.9.2.6.8 2.2 2.5 2.8 2.2.8 6.4.4 9.1-.5 2.3-.8 5.7-1.1 8.2-.5 1.4.3 1.8.6 1.8.6-.1-.5-.3-1.5-.3-1.5z"/>
        </svg>
      );
    case "snowflake":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M12 0l1.4 3.6L12 5l-1.4-1.4L12 0zm0 19l1.4 3.6L12 24l-1.4-1.4L12 19zm-7-7L1.4 10.6 0 12l3.6 1.4L5 12zm14 0l3.6-1.4L24 12l-1.4 1.4L19 12zm-8-5.5l1.6 2.2L12 9.9 10.4 8.7 11 6.5zm0 11l1.6-2.2L12 14.1l-1.6 1.2.6 2.2zM6.5 11l2.2 1.6L9.9 12 8.7 10.4 6.5 11zm11 0l-2.2 1.6L14.1 12l1.2-1.6 2.2.6z"/>
        </svg>
      );
    case "nvidia":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M9.548 7.394c-.053 0-.095.034-.095.076v9.06c0 .042.042.076.095.076.544 0 1.258-.068 2.05-.205 3.328-.574 5.485-2.802 5.485-5.26 0-2.73-2.618-3.747-7.535-3.747zm-1.85-2.643c4.89-.34 11.58.558 11.58 6.942 0 4.708-3.953 8.356-9.73 8.356-.633 0-1.284-.044-1.85-.12v3.07H5.975V1.528h1.723v3.223z"/>
        </svg>
      );
    case "mongodb":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <path d="M12.01 0C11.5 3.5 8 7 8 11.5c0 4.5 3.5 7.5 4.01 12.5.51-5 4.01-8 4.01-12.5C16.02 7 12.52 3.5 12.01 0zM12 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      );
    default:
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

const MeetPartners = ({ data }: { data: MeetPartnersDataType }) => {
  const { subheading, heading, partners } = data;

  const row1 = partners.slice(0, 6);
  const row2 = partners.slice(6);

  return (
    <div className="section-meet-partners section-padding">
      <div className="container">
        {/* Homepage Standard Section Headings */}
        <div className="section-headings text-center">
          {subheading && (
            <Subheading 
              title={subheading}
              cls="text-20"
              aos="fade-up"
            />
          )}

          {heading && (
            <Heading 
              title={heading}
              cls="text-50"
              aos="fade-up"
            />
          )}
        </div>
      </div>

      {/* Moving Partners Marquee */}
      <div className="partners-marquee-wrapper" data-aos="fade-up">
        {/* Row 1 */}
        <div className="partners-track">
          {[...row1, ...row1, ...row1, ...row1].map((partner: PartnerItem, index: number) => (
            <div className="partner-card" key={`partner-row1-${partner.id}-${index}`}>
              <div className="partner-icon-box">
                {renderPartnerIcon(partner.iconType, partner.color)}
              </div>
              <div className="partner-info">
                <span className="heading text-18 fw-700 partner-name">{partner.name}</span>
                <span className="text text-14 partner-role">{partner.role}</span>
                <span className="partner-badge text-12">{partner.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - Reverse */}
        <div className="partners-track partners-track-reverse">
          {[...row2, ...row2, ...row2, ...row2].map((partner: PartnerItem, index: number) => (
            <div className="partner-card" key={`partner-row2-${partner.id}-${index}`}>
              <div className="partner-icon-box">
                {renderPartnerIcon(partner.iconType, partner.color)}
              </div>
              <div className="partner-info">
                <span className="heading text-18 fw-700 partner-name">{partner.name}</span>
                <span className="text text-14 partner-role">{partner.role}</span>
                <span className="partner-badge text-12">{partner.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetPartners;
