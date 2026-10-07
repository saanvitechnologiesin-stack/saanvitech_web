"use client";

import { useEffect, useRef, useCallback } from "react";

interface ProgressBarProps {
  threshold?: number;
  duration?: number;
  children: React.ReactNode;
}

const ProgressBar = ({
  threshold = 0.3,
  duration = 2000,
  children,
}: ProgressBarProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);

  const animateItem = useCallback((item: HTMLElement) => {
    const bar = item.querySelector<HTMLElement>(".progress--bar");
    const number = item.querySelector<HTMLElement>(".progress-number");
    const container = item.querySelector<HTMLElement>(".progress-container");

    if (!bar || !number) return;
    if (container) container.style.position = "relative";

    const target = parseInt(item.dataset.progress || "0", 10);
    if (target === 0) return;

    let current = 0;
    const stepTime = duration / target;

    number.style.position = "absolute";
    number.style.top = "-30px";

    const update = () => {
      current++;
      const width = `${current}%`;
      bar.style.width = width;
      number.textContent = `${current}%`;
      number.style.left = `calc(${current}% - ${number.offsetWidth / 2}px)`;

      if (current < target) {
        setTimeout(update, stepTime);
      }
    };

    update();
  }, [duration]);

  const startAll = useCallback(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll<HTMLElement>(".progress-item");
    items.forEach((item) => animateItem(item));
  }, [animateItem]);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            startAll();
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [threshold, startAll]);

  return <progress-bar ref={sectionRef}>{children}</progress-bar>;
};

export default ProgressBar;
