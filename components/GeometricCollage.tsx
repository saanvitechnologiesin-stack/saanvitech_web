import React from 'react';
import Image from 'next/image';
import { ImageProps } from '@/types/image';
import '@/styles/geometric-collage.css';

interface GeometricCollageProps {
    images: ImageProps[];
    className?: string;
}

const GeometricCollage: React.FC<GeometricCollageProps> = ({ images, className = '' }) => {
    const [img1, img2, img3] = images || [];

    return (
        <div className={`geometric-collage-wrap ${className}`} data-aos="zoom-in-up">
            <div className="geometric-collage-container">
                {/* Decorative Dot Matrix Patterns */}
                <div className="geometric-dot-matrix matrix-top-center" aria-hidden="true">
                    <svg width="100%" height="100%" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dot-pattern-top" width="14" height="14" patternUnits="userSpaceOnUse">
                                <circle cx="7" cy="7" r="1.8" fill="#1c2539" fillOpacity="0.16" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dot-pattern-top)" />
                    </svg>
                </div>

                <div className="geometric-dot-matrix matrix-mid-right" aria-hidden="true">
                    <svg width="100%" height="100%" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dot-pattern-right" width="14" height="14" patternUnits="userSpaceOnUse">
                                <circle cx="7" cy="7" r="1.8" fill="#1c2539" fillOpacity="0.16" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dot-pattern-right)" />
                    </svg>
                </div>

                {/* Triangle 1: Top-Left (Collaborating colleagues at laptop) */}
                {img1 && (
                    <div className="triangle-shape triangle-top-left">
                        <div className="triangle-clip triangle-clip-pointing-left">
                            <Image
                                src={img1.src}
                                alt={img1.alt || 'Team collaboration'}
                                fill
                                sizes="(max-width: 768px) 50vw, 30vw"
                                className="triangle-image object-cover object-[center_55%]"
                                loading={img1.loading || 'lazy'}
                            />
                        </div>
                    </div>
                )}

                {/* Triangle 2: Bottom-Left (Strategic consulting & financial planning) */}
                {img2 && (
                    <div className="triangle-shape triangle-bottom-left">
                        <div className="triangle-clip triangle-clip-pointing-right">
                            <Image
                                src={img2.src}
                                alt={img2.alt || 'Business analysis and consulting'}
                                fill
                                sizes="(max-width: 768px) 40vw, 25vw"
                                className="triangle-image object-cover object-[center_30%]"
                                loading={img2.loading || 'lazy'}
                            />
                        </div>
                    </div>
                )}

                {/* Triangle 3: Right (Creative technology workspace) */}
                {img3 && (
                    <div className="triangle-shape triangle-right">
                        <div className="triangle-clip triangle-clip-pointing-right">
                            <Image
                                src={img3.src}
                                alt={img3.alt || 'Technology workspace and digital solutions'}
                                fill
                                sizes="(max-width: 768px) 55vw, 35vw"
                                className={`triangle-image object-cover ${img3.cls || 'object-center'}`}
                                loading={img3.loading || 'lazy'}
                            />
                        </div>
                    </div>
                )}

                {/* Triangle 4: Dark Navy Solid Accent */}
                <div className="triangle-shape triangle-dark-accent" aria-hidden="true">
                    <div className="triangle-clip triangle-clip-pointing-left triangle-dark-fill" />
                </div>
            </div>
        </div>
    );
};

export default GeometricCollage;
