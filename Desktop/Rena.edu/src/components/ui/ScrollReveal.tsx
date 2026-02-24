"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger children (direct div/section children) with delay */
  stagger?: boolean;
  /** Delay before animation starts */
  delay?: number;
  /** Animation distance in px */
  y?: number;
};

export default function ScrollReveal({
  children,
  className = "",
  stagger = false,
  delay = 0,
  y = 40,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (stagger) {
      const childEls = Array.from(el.children);
      if (childEls.length > 0) {
        gsap.fromTo(
          childEls,
          { y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            delay,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    } else {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [stagger, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
