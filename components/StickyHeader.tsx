'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { StickyHeaderProps } from "@/types/stickyHeaderProps";

const StickyHeader = ({
  wrapperCls,
  container,
  stickyType = "always",
  children,
}: StickyHeaderProps) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerBounds, setHeaderBounds] = useState<DOMRect | null>(null);
  const [currentScrollTop, setCurrentScrollTop] = useState(0);
  const [preventReveal, setPreventReveal] = useState(false);

  const headerIsAlwaysSticky =
    stickyType === "always" || stickyType === "reduce-logo-size";

  // Setting CSS variable
  const setHeaderHeight = useCallback(() => {
    const header = headerRef.current;
    if (header) {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.offsetHeight}px`
      );
    }
  }, []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const header = headerRef.current;
    if (!header || !headerBounds) return;

    const scrollTop = window.scrollY;

    const hide = () => {
      if (!headerIsAlwaysSticky)
        header.classList.add("header-hidden", "header-sticky");
    };

    const reveal = () => {
      if (!headerIsAlwaysSticky) {
        header.classList.add("header-sticky", "animate");
        header.classList.remove("header-hidden");
      }
    };

    const reset = () => {
      if (!headerIsAlwaysSticky)
        header.classList.remove("header-hidden", "header-sticky", "animate");
    };

    if (scrollTop > currentScrollTop && scrollTop > headerBounds.bottom) {
      header.classList.add("scrolled-past-header");
      requestAnimationFrame(hide);
    } else if (scrollTop < currentScrollTop && scrollTop > headerBounds.bottom) {
      header.classList.add("scrolled-past-header");

      if (!preventReveal) {
        requestAnimationFrame(reveal);
      } else {
        clearTimeout((window as any)._scrollTimer);
        (window as any)._scrollTimer = setTimeout(() => setPreventReveal(false), 66);
        requestAnimationFrame(hide);
      }
    } else if (scrollTop <= headerBounds.top) {
      header.classList.remove("scrolled-past-header");
      requestAnimationFrame(reset);
    }

    setCurrentScrollTop(scrollTop);
  }, [headerBounds, currentScrollTop, preventReveal, headerIsAlwaysSticky]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Set header height once and on resize
    setHeaderHeight();
    const resizeObserver = new ResizeObserver(setHeaderHeight);
    resizeObserver.observe(header);

    // Intersection observer (runs once)
    const observer = new IntersectionObserver((entries, obs) => {
      setHeaderBounds(entries[0].intersectionRect);
      obs.disconnect();
    });
    observer.observe(header);

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    if (headerIsAlwaysSticky) header.classList.add("header-sticky");

    // MatchMedia listener for recalculating header height
    const mq = window.matchMedia("(max-width: 990px)");
    mq.addEventListener("change", setHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
      mq.removeEventListener("change", setHeaderHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, setHeaderHeight, headerIsAlwaysSticky]);

  return (
    <sticky-header data-sticky-type={stickyType}>
      <header className={wrapperCls} ref={headerRef}>
        <div className={container}>{children}</div>
      </header>
    </sticky-header>
  );
};

export default StickyHeader;
