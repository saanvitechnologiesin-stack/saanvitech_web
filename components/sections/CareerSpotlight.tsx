import React from "react";
import Image from "next/image";
import PrimaryButton from "../buttons/PrimaryButton";
import CareerSpotlightImg from "@/public/img/careers/career-spotlight-v2.jpg";
import "@/styles/career-spotlight.css";

const CareerSpotlight = () => {
  return (
    <div className="career-spotlight-section mt-100 mb-100">
      <div className="container">
        <div className="career-spotlight-card" data-aos="fade-up">
          <div className="grid grid-cols-12 lg:gap-1 items-center">
            {/* Left Column: Heading, Pitch & CTA */}
            <div className="lg:col-span-7 col-span-12">
              <div className="career-spotlight-content">
                <h2
                  className="heading career-spotlight-heading"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Shape the <span className="highlight-strong">Future</span>. <br />
                  Engineer <span className="highlight-strong">Breakthroughs</span>.
                </h2>

                <p
                  className="text career-spotlight-desc"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  At Saanvi Technologies, your work goes beyond code — you&apos;ll
                  orchestrate intelligent systems, harness next-gen technologies,
                  and solve complex real-world problems every day. With the agility
                  of high-growth innovation and the reach of enterprise scale, you&apos;ll
                  grow your craft, embrace a growth mindset, and thrive in an
                  engineering community that redefines what&apos;s possible.
                </p>

                <p
                  className="text career-spotlight-prompt"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Ready to lead the next era of software engineering? Get in touch.
                </p>

                <div
                  className="career-spotlight-actions"
                  data-aos="fade-up"
                  data-aos-delay="250"
                >
                  <PrimaryButton
                    label="See Current Job Openings"
                    href="/careers"
                    ariaLabel="See Current Job Openings at Saanvi Technologies"
                    cls="button--primary-spotlight"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Engineer Image with seamless blending + minimal floating doodles */}
            <div className="lg:col-span-5 col-span-12">
              <div className="career-spotlight-visual-area" data-aos="fade-left" data-aos-delay="200">
                {/* 1. Speech bubble doodle (top center-left) */}
                <div className="floating-doodle doodle-chat" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    <circle cx="12" cy="11.5" r="1.5" fill="currentColor" />
                  </svg>
                </div>

                {/* 2. Terminal box doodle (top right) */}
                <div className="floating-doodle doodle-terminal" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="18" rx="3" />
                    <polyline points="7 9 10 12 7 15" />
                    <line x1="13" y1="15" x2="17" y2="15" />
                  </svg>
                </div>

                {/* 3. Selection tool / canvas doodle (far left) */}
                <div className="floating-doodle doodle-canvas" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8V4h4" strokeDasharray="2 2" />
                    <path d="M16 4h4v4" strokeDasharray="2 2" />
                    <path d="M20 16v4h-4" strokeDasharray="2 2" />
                    <path d="M8 20H4v-4" strokeDasharray="2 2" />
                    <path d="M9 9l5 12 2-5 5-2L9 9z" fill="currentColor" fillOpacity="0.2" />
                  </svg>
                </div>

                {/* 4. Vector anchor node doodle (mid-low left) */}
                <div className="floating-doodle doodle-vector" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="5" cy="19" r="2.5" fill="currentColor" />
                    <circle cx="19" cy="5" r="2.5" fill="currentColor" />
                    <path d="M5 16.5C5 10 10 5 16.5 5" strokeDasharray="3 3" />
                    <line x1="2" y1="19" x2="8" y2="19" />
                    <line x1="19" y1="2" x2="19" y2="8" />
                  </svg>
                </div>

                {/* 5. Set square / ruler doodle (mid right) */}
                <div className="floating-doodle doodle-ruler" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 21 21 21 21 3 3 21" />
                    <line x1="17" y1="21" x2="17" y2="18" />
                    <line x1="13" y1="21" x2="13" y2="17" />
                    <line x1="9" y1="21" x2="9" y2="18" />
                    <line x1="21" y1="13" x2="18" y2="13" />
                    <line x1="21" y1="9" x2="17" y2="9" />
                  </svg>
                </div>

                {/* Seamless photo container */}
                <div className="career-spotlight-photo-wrap">
                  <Image
                    src={CareerSpotlightImg}
                    alt="Software Engineer at Saanvi Technologies"
                    width={800}
                    height={800}
                    className="career-spotlight-photo"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSpotlight;
