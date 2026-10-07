"use client";

import { useState, useRef, useEffect, useCallback  } from "react";
import "@/styles/faq.css";
import { AccordionType } from "@/types/accrodion";
import Icons from "./Icons";

const Accordion = ({
    cls,
    data
}: AccordionType) => {    
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

    const updateHeights = useCallback(() => {
        contentRefs.current.forEach((ref, i) => {
            if (!ref) return;
            if (activeIndex === i) {
                ref.style.maxHeight = ref.scrollHeight + "px";
            } else {
                ref.style.maxHeight = "0px";
            }
        });
    }, [activeIndex]);

    useEffect(() => {
        updateHeights();
        const onResize = () => updateHeights();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [updateHeights, data]);

    const toggleAccordion = (index: number) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };
    

    return (
        <faq-accordion className={cls}>
            <div 
                className="accordion-list" 
                data-aos="fade-up"
            >
                {data?.map((item, index) => (
                <div 
                    className={`accordion-block ${activeIndex === index ? "active" : ""}`} 
                    key={`faq-${index}`}
                >
                    <div 
                        className="accordion-opener heading text-24" 
                        onClick={() => toggleAccordion(index)}
                    >
                        {item.title}
                        <span className="svg-wrapper icon-24">
                            <Icons.ChevronDown />
                        </span>
                    </div>
                    <div 
                        ref={(el: HTMLDivElement | null) => { 
                            contentRefs.current[index] = el;
                        }}
                        className="accordion-content"
                        style={{ maxHeight: activeIndex === index ? undefined : 0 }}
                    >
                        <div className="accordion-content-inner text text-18">
                            {item.text}
                        </div>
                    </div>
                </div>
                ))}
            </div>                       
        </faq-accordion>
    )
}

export default Accordion;