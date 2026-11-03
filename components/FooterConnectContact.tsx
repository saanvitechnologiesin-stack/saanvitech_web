import Link from 'next/link';

const FooterConnectContact = () => {
    return (
        <div
            className="footer-widget footer-widget-contact"
            data-aos="fade-up"
            data-aos-anchor=".footer-top"
        >
            <h3 className="widget-heading text-20 fw-700">Connect with us on</h3>
            <div className="footer-social-badges">
                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/company/saanvi-techin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-badge linkedin"
                    aria-label="LinkedIn"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                </a>
                {/* Instagram */}
                <a
                    href="https://www.instagram.com/saanvi__technologies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-badge instagram"
                    aria-label="Instagram"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </a>
            </div>

            {/* Contact us info */}
            <div className="footer-contact-block">
                <div className="footer-info-heading">
                    <span className="icon-orange">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                    </span>
                    <span className="fw-700 text-16 text-heading">Contact us</span>
                </div>
                <div className="footer-info-details">
                    <a href="mailto:chinmaya@saanvitechin.com" className="footer-info-link">chinmaya@saanvitechin.com</a>
                    <a href="mailto:info@saanvitechin.com" className="footer-info-link">info@saanvitechin.com</a>
                </div>
            </div>

            {/* Call Us info */}
            <div className="footer-contact-block">
                <div className="footer-info-heading">
                    <span className="icon-orange">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1.01A11.36 11.36 0 0 1 8.5 3.92c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.54c0-.55-.45-1-1-1z" />
                        </svg>
                    </span>
                    <span className="fw-700 text-16 text-heading">Call Us</span>
                </div>
                <div className="footer-info-details">
                    <a href="tel:+918431607569" className="footer-info-link">+91 84316 07569</a>
                </div>
            </div>
        </div>
    );
};

export default FooterConnectContact;
