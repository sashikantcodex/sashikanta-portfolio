"use client";

import { useEffect } from "react";
import type { Project } from "@/lib/data";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-back" onClick={onClose} role="presentation">
      <article
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <div className="kicker">
              {project.index} · {project.kind} · {project.year}
            </div>
            <h3 id="project-title">{project.title}</h3>
            <p>{project.org}</p>
          </div>
          <button className="close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <p>{project.summary}</p>
        <div className="modal-grid">
          <div>
            <h4>Problem</h4>
            <p>{project.problem}</p>
          </div>
          <div>
            <h4>Architecture</h4>
            <p>{project.architecture}</p>
          </div>
        </div>
        <h4>Outcomes</h4>
        <ul>
          {project.outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="pills" style={{ marginTop: 18 }}>
          {project.stack.map((item) => (
            <span className="pill" key={item}>
              {item}
            </span>
          ))}
        </div>
        {project.github && (
          <div className="actions">
            <a className="btn solid" href={project.github} target="_blank" rel="noreferrer">
              View GitHub
            </a>
          </div>
        )}
      </article>
    </div>
  );
}
