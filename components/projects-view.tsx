"use client";

import { useMemo, useState } from "react";
import { projects, type Project } from "@/lib/data";
import { ProjectModal } from "./project-modal";

const filters = ["All", "AI", "Healthcare", "Platform", "Open source"] as const;

export function ProjectsView() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.kind === filter)),
    [filter],
  );

  return (
    <div className="archive">
      <p className="kicker">Archive</p>
      <h2>
        All <em>projects</em>
      </h2>
      <p className="lede">
        Technical work from production healthcare platforms and public AI repositories. Employer systems are case notes,
        not public code.
      </p>
      <div className="filters" role="tablist">
        {filters.map((item) => (
          <button
            key={item}
            className={`filter${filter === item ? " on" : ""}`}
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid">
        {visible.map((project) => (
          <button key={project.id} className="card" onClick={() => setSelected(project)}>
            <div className="card-top">
              <span>
                {project.index} · {project.kind}
              </span>
              <span>{project.year}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="card-foot">
              <span>{project.org}</span>
              <span>{project.github ? "GitHub" : "Case note"}</span>
            </div>
          </button>
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
