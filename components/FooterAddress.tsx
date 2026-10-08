const FooterAddress = () => {
    return (
        <div
            className="footer-widget footer-widget-address"
            data-aos="fade-up"
            data-aos-anchor=".footer-top"
        >
            {/* Head Office Address */}
            <div className="footer-contact-block">
                <div className="footer-info-heading">
                    <span className="icon-orange">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                        </svg>
                    </span>
                    <span className="fw-700 text-16 text-heading">Head Office Address</span>
                </div>
                <div className="footer-info-details">
                    <p className="footer-info-text">Anugraha, H No 3/68, Main Road</p>
                    <p className="footer-info-text">NH66,</p>
                    <p className="footer-info-text">Saligrama - 576225 Brahmavara Taluk,</p>
                    <p className="footer-info-text">Udupi District</p>
                </div>
            </div>

            {/* US Office Address */}
            <div className="footer-contact-block">
                <div className="footer-info-heading">
                    <span className="icon-orange">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                        </svg>
                    </span>
                    <span className="fw-700 text-16 text-heading">US Office Address</span>
                </div>
                <div className="footer-info-details">
                    <p className="footer-info-text">North Andover, MA 01845</p>
                </div>
            </div>
        </div>
    );
};

export default FooterAddress;
