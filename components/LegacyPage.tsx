"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { LegacyPageData } from "@/lib/legacy";
import { HERO_SLOT_MARKER } from "@/lib/hero-slot";

const heroImages = ["/images/car1.jpg", "/images/car2.jpg", "/images/bg.jpg"];

function HeroSlideshow({ heroContentHtml }: { heroContentHtml: string }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 10000);

    return () => window.clearInterval(interval);
  }, []);

  const showPreviousImage = () => {
    setActiveImage((current) => (current - 1 + heroImages.length) % heroImages.length);
  };

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % heroImages.length);
  };

  return (
    <section className="hero hero-section" id="home">
      <div className="hero-backgrounds" aria-hidden="true">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`hero-background ${index === activeImage ? "hero-background-active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content" dangerouslySetInnerHTML={{ __html: heroContentHtml }} />

      <div className="hero-slider-dots">
        {heroImages.map((image, index) => (
          <button
            key={image}
            type="button"
            className={`hero-slider-dot ${index === activeImage ? "active" : ""}`}
            onClick={() => setActiveImage(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === activeImage ? "true" : undefined}
          />
        ))}
      </div>

      <div className="hero-slider-controls">
        <button type="button" className="hero-slider-arrow" onClick={showPreviousImage} aria-label="Previous slide">
          &lsaquo;
        </button>
        <button type="button" className="hero-slider-arrow" onClick={showNextImage} aria-label="Next slide">
          &rsaquo;
        </button>
      </div>
    </section>
  );
}

type LegacyPageProps = LegacyPageData & {
  children?: ReactNode;
};

export function LegacyPage({ css, bodyHtml, inlineScripts, heroContentHtml, children }: LegacyPageProps) {
  const ran = useRef(false);
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    inlineScripts.forEach((src) => {
      const el = document.createElement("script");
      el.textContent = src;
      document.body.appendChild(el);
    });
    window.setTimeout(() => {
      window.__therainInstallTranslateToggle?.();
    }, 0);
  }, [inlineScripts]);

  useEffect(() => {
    const getMobileNav = () => pageRef.current?.querySelector<HTMLElement>("#mobileNav") ?? null;
    const getMenuButton = () => pageRef.current?.querySelector<HTMLElement>("#hamburgerBtn, .hamburger") ?? null;

    const isMenuOpen = (menu: HTMLElement) => menu.classList.contains("open") || menu.style.display === "flex";

    const closeMenu = () => {
      const menu = getMobileNav();
      if (!menu) return;

      menu.classList.remove("open");
      if (menu.style.display === "flex") {
        menu.style.display = "none";
      }
    };

    const handleOutsideClick = (event: PointerEvent) => {
      const menu = getMobileNav();
      if (!menu || !isMenuOpen(menu)) return;

      const target = event.target as Node;
      const clickedInsideMenu = menu.contains(target);
      const clickedMenuButton = getMenuButton()?.contains(target);

      if (!clickedInsideMenu && !clickedMenuButton) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const handleMenuLinkClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest("#mobileNav a")) {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleMenuLinkClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleMenuLinkClick);
    };
  }, []);

  const hasHeroSlot = bodyHtml.includes(HERO_SLOT_MARKER);
  const [beforeHero, afterHero] = hasHeroSlot ? bodyHtml.split(HERO_SLOT_MARKER) : [bodyHtml, ""];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={pageRef}>
        <div dangerouslySetInnerHTML={{ __html: beforeHero }} />
        {hasHeroSlot && (children ?? <HeroSlideshow heroContentHtml={heroContentHtml} />)}
        {hasHeroSlot && <div dangerouslySetInnerHTML={{ __html: afterHero }} />}
      </div>
    </>
  );
}
