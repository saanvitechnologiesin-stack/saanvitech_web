'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { ServiceProps } from "@/types/service";
import parser from "html-react-parser";
import Link from "next/link";
import Icons from "./Icons";


const AccordionHorizontal = ({ items }: { items: ServiceProps[] }) => {
  const buttonsRef = useRef<HTMLDivElement[]>([]);

  // Handle horizontal accordion
  const toggleWidth = useCallback((index: number) => {
    buttonsRef.current.forEach((btn, i) => {
      const li = btn.closest('.accordion-li') as HTMLElement;
      if (!li) return;
      li.classList.toggle('active', i === index);
    });
  }, []);

  // Handle vertical accordion
  const toggleHeight = useCallback((index: number) => {
    buttonsRef.current.forEach((btn, i) => {
      const li = btn.closest('.accordion-li') as HTMLElement;
      const content = btn.nextElementSibling as HTMLElement | null;
      if (!li || !content) return;
      if (i === index) {
        li.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight}px`;
      } else {
        li.classList.remove('active');
        content.style.maxHeight = '0';
      }
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 992px)');

    buttonsRef.current.forEach((btn) => {
      const li = btn.closest('.accordion-li') as HTMLElement;
      if (li) {
        li.style.setProperty('--width', `${btn.offsetWidth}px`);
      }
    });

    const firstClick = () => {
      if (mediaQuery.matches) toggleWidth(0);
      else toggleHeight(0);
    };

    firstClick();

    // clean up inline maxHeights when resizing
    const handleResize = () => {
      buttonsRef.current.forEach((btn) => {
        const content = btn.nextElementSibling as HTMLElement | null;
        if (content) content.style.maxHeight = '';
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [toggleWidth, toggleHeight]);

  const handleClick = (index: number) => {
    const isDesktop = window.matchMedia('(min-width: 992px)').matches;
    if (isDesktop) toggleWidth(index);
    else toggleHeight(index);
  };

  return (
    <div className="accordion-horizontal">
      <ul className="service-list list-unstyled radius18">
        {items.slice(0, 7).map((item, index) => (
          <li className="accordion-li" key={index}>
            <div
              className="accordion-title"
              ref={(el) => {
                if (el) buttonsRef.current[index] = el;
              }}
              onClick={() => handleClick(index)}
            >
                <div className="accordion-title-icon">
                    {item.icon && <span className="icon-main">{parser(item.icon)}</span>}
                    <h2 className="heading text-24 text-rotate">{item.title}</h2>
                </div>
                <span className="icon icon-plus-circle">
                    <Icons.PlusCircle />
                </span>
                <span className="icon icon-minus-circle">
                    <Icons.MinusCircle />
                </span>
            </div>
            <div className="accordion-content">
              <div className="service-content-inner">
                <div>                    
                    {item.icon && <span className="icon-main">{parser(item.icon)}</span>}
                    <h2 className="heading text-24">{item.title}</h2>
                    {item.description && <p className="text text-16">{parser(item.description)}</p>}
                </div>
                <div className="service-button">
                  <Link href={`/services/${item.slug}`} className="button button--primary">
                    + View Details
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccordionHorizontal;
