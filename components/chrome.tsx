"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Grain() {
  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export function ScrollProgress() {
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScale(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="progress" style={{ width: `${scale * 100}%` }} />;
}

export function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    document.body.classList.add("cursor-on");
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      const hot = (event.target as HTMLElement | null)?.closest("a, button");
      ring.classList.toggle("hot", Boolean(hot));
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      frame = requestAnimationFrame(loop);
    };
    let frame = requestAnimationFrame(loop);
    window.addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      dot.remove();
      ring.remove();
      document.body.classList.remove("cursor-on");
    };
  }, []);
  return null;
}

export function Boot() {
  const [phase, setPhase] = useState<"hold" | "play" | "done">("hold");
  useEffect(() => {
    if (sessionStorage.getItem("ss-boot")) {
      setPhase("done");
      return;
    }
    setPhase("play");
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("ss-boot", "1");
      setPhase("done");
    }, 1600);
    return () => window.clearTimeout(timer);
  }, []);
  if (phase === "done") return null;
  return (
    <div className="boot" role="status" aria-live="polite">
      <div className="boot-card">
        <p>$ ssh sashikanta@production --role SDE-4 --years 8</p>
        <p>Authenticating identity · healthcare · AI</p>
        <p className="ok">CONNECTED — Sashikanta Sahoo</p>
        <div className="boot-bar">
          <span />
        </div>
      </div>
    </div>
  );
}

export function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = () => [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (reduce) {
      nodes().forEach((node) => node.classList.add("in"));
      return;
    }

    let lastY = window.scrollY;
    const direction = () => {
      const y = window.scrollY;
      const down = y >= lastY;
      lastY = y;
      return down ? "down" : "up";
    };

    const paint = (entry: IntersectionObserverEntry) => {
      const node = entry.target as HTMLElement;
      if (!entry.isIntersecting || node.classList.contains("in")) return;
      node.dataset.dir = direction();
      node.classList.add("in");
    };

    const observer = new IntersectionObserver((entries) => entries.forEach(paint), {
      threshold: 0.01,
      rootMargin: "0px 0px -6% 0px",
    });

    const watch = () => {
      nodes().forEach((node) => {
        if (node.dataset.watched === "1") return;
        node.dataset.watched = "1";
        observer.observe(node);
      });
    };

    watch();
    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
  return null;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Work", "#work"],
    ["Experience", "#experience"],
    ["Stack", "#stack"],
    ["Archive", "/projects"],
  ];

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}${hidden && !open ? " hide" : ""}`}>
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="mark">SS</span>
          Sashikanta
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map(([label, href]) =>
            href.startsWith("#") ? (
              <a key={href} href={href}>
                {label}
              </a>
            ) : (
              <Link key={href} href={href}>
                {label}
              </Link>
            ),
          )}
          <a className="nav-cta" href="#contact">
            Let&apos;s talk
          </a>
        </nav>
        <button className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span />
        </button>
      </header>
      {open && (
        <nav className="drawer" aria-label="Mobile">
          {links.map(([label, href]) =>
            href.startsWith("#") ? (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ) : (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ),
          )}
          <a href="#contact" onClick={() => setOpen(false)}>
            Let&apos;s talk
          </a>
        </nav>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <em>Sashikanta Sahoo</em>
        <div>Senior AI Full Stack Engineer · Bengaluru</div>
      </div>
      <div>© {new Date().getFullYear()} · Built with Next.js</div>
    </footer>
  );
}
