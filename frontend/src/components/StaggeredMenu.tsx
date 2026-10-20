import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./StaggeredMenu.css";

export interface MenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
  isAnchor?: boolean;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: MenuItem[];
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  className?: string;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#E8B923", "#141e30"],
  items = [],
  menuButtonColor = "#fff",
  openMenuButtonColor = "#E8B923",
  accentColor = "#E8B923",
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<Element[]>([]);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);
  const navigate = useNavigate();

  // Scroll lock when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Initial GSAP setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: Element[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer"));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
    );
    const headerEl = panel.querySelector(".sm-panel-header");
    const footerEl = panel.querySelector(".sm-panel-footer");

    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length)
      gsap.set(numberEls, { "--sm-num-opacity": 0 } as gsap.TweenVars);
    if (headerEl) gsap.set(headerEl, { opacity: 0, y: -15 });
    if (footerEl) gsap.set(footerEl, { opacity: 0, y: 25 });

    const tl = gsap.timeline({ paused: true });

    // 1. Prelayers sweep in
    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.45, ease: "power4.out" },
        i * 0.08
      );
    });

    // 2. Main panel sweeps in
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.08 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.6;

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    // 3. Header bar fades in
    if (headerEl) {
      tl.to(
        headerEl,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        panelInsertTime + 0.1
      );
    }

    // 4. Staggered menu items appear with rotation & translateY
    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.85,
          ease: "power4.out",
          stagger: { each: 0.07, from: "start" },
        },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.5,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: { each: 0.06 },
          } as gsap.TweenVars,
          itemsStart + 0.08
        );
      }
    }

    // 5. Footer strip fades in
    if (footerEl) {
      const footerStart = panelInsertTime + panelDuration * 0.35;
      tl.to(
        footerEl,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        footerStart
      );
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;
    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(
          panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
        );
        if (numberEls.length)
          gsap.set(numberEls, { "--sm-num-opacity": 0 } as gsap.TweenVars);
        const headerEl = panel.querySelector(".sm-panel-header");
        const footerEl = panel.querySelector(".sm-panel-footer");
        if (headerEl) gsap.set(headerEl, { opacity: 0, y: -15 });
        if (footerEl) gsap.set(footerEl, { opacity: 0, y: 25 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    spinTweenRef.current = gsap.to(icon, {
      rotate: opening ? 225 : 0,
      duration: opening ? 0.75 : 0.35,
      ease: opening ? "power4.out" : "power3.inOut",
      overwrite: "auto",
    });
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        colorTweenRef.current = gsap.to(btn, {
          color: opening ? openMenuButtonColor : menuButtonColor,
          delay: 0.15,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      gsap.set(toggleBtnRef.current, {
        color:
          changeMenuColorOnOpen && openRef.current
            ? openMenuButtonColor
            : menuButtonColor,
      });
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();
    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 2;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.45 + lineCount * 0.05,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  const handleNavClick = useCallback(
    (link: string, isAnchor?: boolean) => {
      closeMenu();
      if (isAnchor) {
        const id = link.replace(/^\/?#/, "").replace(/^.*#/, "");
        if (window.location.pathname === "/" || window.location.pathname === "") {
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 350);
        } else {
          navigate(link);
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 500);
        }
      } else {
        setTimeout(() => navigate(link), 320);
      }
    },
    [closeMenu, navigate]
  );

  // Close on outside click
  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  // Close on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu]);

  // Pre-layer curtain colors
  const preLayers = colors && colors.length > 0 ? colors.slice(0, 3) : ["#E8B923", "#141e30"];

  return (
    <>
      <div
        className={
          (className ? className + " " : "") +
          "staggered-menu-wrapper" +
          (isFixed ? " fixed-wrapper" : "")
        }
        style={accentColor ? ({ "--sm-accent": accentColor } as React.CSSProperties) : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        {/* Menu toggle button (placed in navbar context) */}
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="sm-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </div>

      {/* Render Backdrop, Pre-layer Curtains, and Side Panel directly at body level via Portal */}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            className="staggered-menu-portal"
            style={accentColor ? ({ "--sm-accent": accentColor } as React.CSSProperties) : undefined}
            data-position={position}
            data-open={open || undefined}
          >
            {/* Background Dimming Backdrop */}
            <div
              className={`sm-backdrop ${open ? "sm-backdrop-visible" : ""}`}
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Colour curtain pre-layers */}
            <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
              {preLayers.map((c, i) => (
                <div key={i} className="sm-prelayer" style={{ background: c }} />
              ))}
            </div>

            {/* Side panel */}
            <aside
              id="sm-panel"
              ref={panelRef}
              className="staggered-menu-panel"
              aria-hidden={!open}
              aria-label="Site navigation"
            >
              <div className="sm-panel-inner">
                {/* Top Panel Header with close button */}
                <div className="sm-panel-header">
                  <div className="sm-panel-brand">
                    <span className="sm-panel-brand-title">JMMS</span>
                    <span className="sm-panel-brand-sub">Est. 1985 · Salangaon</span>
                  </div>
                  <button
                    type="button"
                    className="sm-panel-close"
                    onClick={closeMenu}
                    aria-label="Close menu"
                  >
                    <span aria-hidden="true">✕</span>
                  </button>
                </div>

                {/* Navigation Links with animated number counters */}
                <ul className="sm-panel-list" role="list" data-numbering="true">
                  {items.length > 0 ? (
                    items.map((it, idx) => (
                      <li className="sm-panel-itemWrap" key={it.label + idx}>
                        <button
                          className="sm-panel-item"
                          aria-label={it.ariaLabel || it.label}
                          data-index={idx + 1}
                          onClick={() => handleNavClick(it.link, it.isAnchor)}
                        >
                          <span className="sm-panel-itemLabel">{it.label}</span>
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="sm-panel-itemWrap" aria-hidden="true">
                      <span className="sm-panel-item">
                        <span className="sm-panel-itemLabel">No items</span>
                      </span>
                    </li>
                  )}
                </ul>

                {/* Bottom CTA strip and contacts */}
                <div className="sm-panel-footer">
                  <div className="sm-footer-cta">
                    <button
                      type="button"
                      onClick={() => handleNavClick("/#admissions", true)}
                      className="sm-footer-admission-btn"
                    >
                      Apply for Admissions 2026-27 →
                    </button>
                  </div>
                  <p className="sm-footer-tagline">
                    Salangaon, Dehradun · Childhood is a journey, not a race
                  </p>
                  <div className="sm-footer-links">
                    <a href="tel:+919412051913" className="sm-footer-link">
                      📞 +91-9412051913
                    </a>
                    <a href="mailto:jmms.dehradun@gmail.com" className="sm-footer-link">
                      ✉ jmms.dehradun@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
};

export default StaggeredMenu;
