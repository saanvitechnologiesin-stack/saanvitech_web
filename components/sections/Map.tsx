"use client";

import "@/styles/google-map.css";

const MapSection = () => {
    return (
        <div className="google-map">
            <div className="iframe-wrapper">
                <iframe
                    src="https://maps.google.com/maps?q=Saligrama+Main+Road+NH66+Brahmavara+Taluk+Udupi+District+Karnataka+576225&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    title="Head Office Location - Saligrama, Udupi"
                    width="1920"
                    height="600"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
      </div>
    )
}

export default MapSection;