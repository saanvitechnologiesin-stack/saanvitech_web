"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icons from "./Icons";

interface SocialShareProps {
  title: string;
}

const Share = ({ title }: SocialShareProps) => {
    const pathname = usePathname();
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") setUrl(window.location.origin + pathname);
    }, [pathname]);

    // encoded values
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return (
        <ul className="social-icons list-unstyled">
            <li>
                <a
                    className="social-link text" 
                    target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                >
                    <Icons.FaceBook />
                    <span className="visually-hidden">Facebook</span>
                </a>
            </li>
            <li>
                <a
                    className="social-link text"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                >
                    <Icons.LinkedIn />
                    <span className="visually-hidden">Linkedin</span>
                </a>
            </li>
            <li>
                <a
                    className="social-link text"
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                >
                    <Icons.Twitter />
                    <span className="visually-hidden">Twitter</span>
                </a>
            </li>
        </ul>
    )
}

export default Share;