"use client";

import { useEffect, useRef } from "react";
import Icons from "@/components/Icons";

const ScrollTop: React.FC = () => {
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
        const scrollToTopButton = buttonRef.current;
        const footer = document.querySelector("footer");
        if (!scrollToTopButton) return;

        const scrollThreshold = 200;
        const footerHeight = footer ? footer.offsetHeight : 0;
        const distanceFromFooter = 50;

        const scrollY = window.scrollY || window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;

        // Show / Hide
        if (scrollY > scrollThreshold) {
            scrollToTopButton.classList.add("show");
        } else {
            scrollToTopButton.classList.remove("show");
        }

      // Stop before footer logic
      if (footer) {
        const buttonBottomRelativeToViewport = viewportHeight - scrollToTopButton.getBoundingClientRect().bottom;
        const distanceToFooterTop = documentHeight - scrollY - viewportHeight - footerHeight;

        if (distanceToFooterTop < distanceFromFooter) {
            scrollToTopButton.style.transform = "scale(0)";
            scrollToTopButton.style.bottom = `${
            footerHeight +
            distanceFromFooter -
            (viewportHeight - buttonBottomRelativeToViewport)
          }px`;
        } else {
            scrollToTopButton.style.transform = "scale(1)";
            scrollToTopButton.style.bottom = "20px";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-to-top"
        ref={buttonRef}
        onClick={scrollToTop}
    >
        <Icons.ScrollTop />
    </div>
  );
};

export default ScrollTop;
