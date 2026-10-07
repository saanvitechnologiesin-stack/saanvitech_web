"use client";

import { useEffect, useRef } from "react";

interface CounterUpProps {
  threshold?: number; // intersection threshold (default 0.5)
  children: React.ReactNode;
}

const CounterUpWrapper = ({ 
    threshold = 0.5, 
    children 
}: CounterUpProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);

  // Animate all counters
  const startCounters = () => {
    if (!sectionRef.current) return;

    const counters = sectionRef.current.querySelectorAll<HTMLElement>(
      ".counter-item .heading"
    );

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target || "0", 10);
      const speed = 100;
      let current = 0;
      const increment = target / speed;

      const numberNode = Array.from(counter.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      const update = () => {
        current += increment;
        if (current < target) {
          if (numberNode) {
            numberNode.textContent = Math.ceil(current).toString();
          }
          requestAnimationFrame(update);
        } else {
          if (numberNode) {
            numberNode.textContent = target.toString();
          }
        }
      };

      update();
    });
  };

  // Set up Intersection Observer
  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            startCounters();
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={sectionRef}>{children}</div>;
};

export default CounterUpWrapper;
