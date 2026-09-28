"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  conversations,
  experience,
  metrics,
  principles,
  profile,
  projects,
  radar,
  stackMarquee,
  terminalLines,
} from "@/lib/data";
import { ProjectModal } from "./project-modal";
import { ResumeSection } from "./resume-section";
import { StackGrid } from "./stack-grid";
import type { Project } from "@/lib/data";

function useCount(target: number, active: boolean, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const factor = 10 ** decimals;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased * factor) / factor);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, decimals, target]);
  return value;
}

function AnimatedWord({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {text.split("").map((character, index) => (
        <span className="letter" key={`${character}-${index}`} style={{ animationDelay: `${index * 0.045}s` }}>
          {character}
        </span>
      ))}
    </span>
  );
}

function Metric({
  value,
  decimals,
  suffix,
  label,
  detail,
  active,
}: (typeof metrics)[number] & { active: boolean }) {
  const shown = useCount(value, active, decimals);
  const labelText = decimals > 0 ? shown.toFixed(decimals) : String(shown);
  return (
    <article className="metric">
      <div className="num">
        {labelText}
        <span>{suffix}</span>
      </div>
      <small>{label}</small>
      <em>{detail}</em>
    </article>
  );
}

export function HomeView() {
  const featured = projects.filter((project) => project.featured);
  const [selected, setSelected] = useState<Project | null>(null);
  const [typed, setTyped] = useState(1);
  const [metricsOn, setMetricsOn] = useState(false);
  const loop = useMemo(() => [...stackMarquee, ...stackMarquee], []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(terminalLines.length);
      return;
    }
    const timer = window.setInterval(() => {
      setTyped((count) => (count >= terminalLines.length ? count : count + 1));
    }, 220);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const node = document.getElementById("impact");
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMetricsOn(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".radar");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.3 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow reveal">
            <span className="live" />
            {profile.company} · {profile.location}
          </div>
          <h1 className="reveal d1">
            <span className="sr-only">Sashikanta Sahoo</span>
            <AnimatedWord text="Sashikanta" />
            <br />
            <AnimatedWord className="gradient-word" text="Sahoo" />
          </h1>
          <p className="lede reveal d2">{profile.lede}</p>
          <div className="actions reveal d3">
            <a className="btn solid" href="#work">
              Selected work
            </a>
            <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
          <div className="meta-row reveal d3">
            <span>
              <strong>{profile.title}</strong> · {profile.role}
            </span>
            <span>{profile.availability}</span>
          </div>
        </div>
        <div className="terminal reveal d2" aria-hidden="true">
          <div className="terminal-bar">
            <i className="dot r" />
            <i className="dot y" />
            <i className="dot g" />
            <span>profile.load()</span>
          </div>
          <pre>
            {terminalLines.slice(0, typed).map((line, index) => (
              <div key={line.text}>
                {line.prompt ? <span className="prompt">$ </span> : null}
                {line.text}
                {index === typed - 1 ? <i className="caret" /> : null}
              </div>
            ))}
          </pre>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {loop.map((item, index) => (
            <span key={`${item}-${index}`}>
              <b>✦</b> {item}
            </span>
          ))}
        </div>
      </div>

      <section id="impact" data-reveal>
        <div className="section-head">
          <div>
            <p className="kicker">Latency budget</p>
            <h2>
              What production <em>actually</em> moved.
            </h2>
          </div>
          <p>Load time, deploy time, and API time. Each one was measured on a healthcare system that stayed up.</p>
        </div>
        <div className="metrics">
          {metrics.map((metric) => (
            <Metric key={metric.label} {...metric} active={metricsOn} />
          ))}
        </div>
      </section>

      <section className="about" id="about" data-reveal>
        <figure className="portrait">
          <img src={profile.avatar} alt="Portrait of Sashikanta Sahoo" />
          <figcaption>
            <strong>{profile.name}</strong>
            <span>{profile.handle}</span>
          </figcaption>
        </figure>
        <div className="about-copy">
          <p className="kicker">Practice</p>
          <h2>
            Platform first, <em>model</em> second.
          </h2>
          <p>{profile.bio}</p>
          <div className="pills">
            <span className="pill">HIPAA platforms</span>
            <span className="pill">Multi-tenant RBAC</span>
            <span className="pill">Citation-backed RAG</span>
            <span className="pill">Mentors 3 engineers</span>
            <span className="pill">Tech lead since 2022</span>
            <span className="pill">{profile.education}</span>
          </div>
        </div>
      </section>

      <section id="work" data-reveal>
        <div className="section-head">
          <div>
            <p className="kicker">Case file</p>
            <h2>
              Systems with a <em>before</em> and after.
            </h2>
          </div>
          <div>
            <p>Public retrieval builds sit beside production eCOA and prior authorization. Open a card for the architecture.</p>
            <p className="rail-hint">Scroll sideways · click for details</p>
          </div>
        </div>
        <div className="rail" tabIndex={0} aria-label="Featured projects">
          {featured.map((project) => (
            <button key={project.id} className="card" onClick={() => setSelected(project)}>
              <div className="card-top">
                <span>{project.index}</span>
                <span>{project.year}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="card-foot">
                <span>{project.org}</span>
                <span className="tags">
                  {project.stack.slice(0, 3).map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="actions">
          <Link className="btn ghost" href="/projects">
            All projects
          </Link>
        </div>
      </section>

      <ExperienceJourney />

      <section id="stack" data-reveal>
        <div className="section-head">
          <div>
            <p className="kicker">Workbench</p>
            <h2>
              The runtime I <em>trust</em>.
            </h2>
          </div>
          <p>Typed UI, tenant-aware APIs, vector retrieval, and the pipeline that ships them. One layer at a time.</p>
        </div>
        <StackGrid />
      </section>

      <section id="principles" data-reveal>
        <div className="section-head">
          <div>
            <p className="kicker">Review bar</p>
            <h2>
              Rules that survive a <em>merge</em>.
            </h2>
          </div>
          <p>Performance, HIPAA, shared UI, and a number you can point at. That is the bar before a clinical change ships.</p>
        </div>
        <div className="principles">
          {principles.map((item) => (
            <article className="principle" key={item.kicker}>
              <span>{item.kicker}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="radar" data-reveal>
        <div className="section-head">
          <div>
            <p className="kicker">In flight</p>
            <h2>
              What the next <em>quarter</em> is for.
            </h2>
          </div>
          <p>Agent graphs, retrieval quality, and the platform around them. This is the work beside delivery, not a second résumé.</p>
        </div>
        <div className="radar">
          {radar.map((item) => (
            <div className="bar-row" key={item.name}>
              <strong>{item.name}</strong>
              <div className="track">
                <span style={{ ["--w" as string]: `${item.level}%` }} />
              </div>
              <em>{item.note}</em>
            </div>
          ))}
        </div>
      </section>

      <ResumeSection />

      <ContactStudio />

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function ExperienceJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState("");
  const [box, setBox] = useState({ w: 1000, h: 800 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const draw = () => {
      const nodes = [...root.querySelectorAll<HTMLElement>(".journey-node")];
      const bounds = root.getBoundingClientRect();
      if (!nodes.length || bounds.width < 40) return;
      const points = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - bounds.left,
          y: rect.top + rect.height / 2 - bounds.top,
        };
      });
      const first = points[0];
      let d = `M ${first.x + 120} ${Math.max(12, first.y - 90)}`;
      let previous = { x: first.x + 120, y: Math.max(12, first.y - 90) };
      points.forEach((point, index) => {
        const swing = index % 2 === 0 ? 90 : -90;
        const mid = (previous.y + point.y) / 2;
        d += ` C ${previous.x + swing} ${mid}, ${point.x - swing} ${mid}, ${point.x} ${point.y}`;
        previous = point;
      });
      const last = points[points.length - 1];
      d += ` C ${last.x - 40} ${last.y + 70}, ${last.x + 80} ${last.y + 110}, ${last.x + 10} ${bounds.height - 8}`;
      setPath(d);
      setBox({ w: bounds.width, h: bounds.height });
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(root);
    window.addEventListener("resize", draw);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, []);

  return (
    <section id="experience" data-reveal>
      <div className="section-head">
        <div>
          <p className="kicker">Clinical tenure</p>
          <h2>
            From the UI to the <em>tenant</em> boundary.
          </h2>
        </div>
        <p>eCOA and GenAI at IQVIA, prior authorization at CitiusTech, a CGM glucose graph at L&amp;T, then the first enterprise front end.</p>
      </div>
      <div className="journey" ref={rootRef}>
        <svg className="journey-svg" viewBox={`0 0 ${box.w} ${box.h}`} aria-hidden="true">
          <path d={path} />
        </svg>
        {experience.map((job, index) => {
          return (
            <article key={job.id} className={`journey-card ${index % 2 === 0 ? "right" : "left"}`}>
              <span className="journey-node" />
              <time>{job.dates}</time>
              <h3>{job.company}</h3>
              <p>
                {job.role}. {job.summary}
              </p>
              <div className="duties">
                {job.duties.map((duty) => (
                  <div key={duty.label}>
                    <h4>{duty.label}</h4>
                    <ul>
                      {duty.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ContactStudio() {
  const [caseId, setCaseId] = useState<(typeof conversations)[number]["id"]>(conversations[0].id);
  const [sent, setSent] = useState(false);
  const selected = conversations.find((item) => item.id === caseId) ?? conversations[0];

  return (
    <section className="contact" id="contact" data-reveal>
      <div>
        <p className="kicker">Open channel</p>
        <h2>
          Name the <em>conversation</em>.
        </h2>
        <p className="lede" style={{ marginTop: 12 }}>
          {profile.availability}. {profile.modes}. Pick a case. The note opens in your mail app with that subject already set.
        </p>
        <div className="use-cases" role="listbox" aria-label="Conversation">
          {conversations.map((item) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={item.id === selected.id}
              className={`use-case${item.id === selected.id ? " on" : ""}`}
              onClick={() => {
                setCaseId(item.id);
                setSent(false);
              }}
            >
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </button>
          ))}
        </div>
        <div className="contact-links">
          <a href="#resume">
            <b><span className="emoji" aria-hidden="true">📄</span> Resume</b>
            <span>Section</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <b><span className="emoji" aria-hidden="true">💼</span> LinkedIn</b>
            <span>Profile</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <b><span className="emoji" aria-hidden="true">🐙</span> GitHub</b>
            <span>Code</span>
          </a>
          <a href={`mailto:${profile.email}`}>
            <b><span className="emoji" aria-hidden="true">✉️</span> {profile.email}</b>
            <span>Email</span>
          </a>
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const name = String(data.get("name") || "");
          const note = String(data.get("note") || "");
          const from = String(data.get("from") || "");
          const subject = encodeURIComponent(`${selected.subject} — ${name || "Hello"}`);
          const body = encodeURIComponent(`${selected.title}\n${selected.detail}\n\n${note}\n\nFrom: ${from}`);
          window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
          setSent(true);
        }}
      >
        <p className="form-kicker">{selected.subject}</p>
        <label>
          Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Email
          <input name="from" type="email" required placeholder="you@company.com" />
        </label>
        <label>
          Note
          <textarea key={selected.id} name="note" required placeholder={selected.prompt} />
        </label>
        <button className="btn solid" type="submit">
          Start a conversation
        </button>
        <p className="form-note">
          {sent
            ? "Your mail app should open with this case already in the subject."
            : "Opens your email client with the case you picked. Nothing is stored on this site."}
        </p>
      </form>
    </section>
  );
}
