"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { skillGroups } from "@/lib/data";

// Indices reference the existing inventory, so no skills are added or lost.
const branches: [string, number[]][][] = [
  [["Foundations", [0, 1, 4]], ["Rendering", [2, 6, 10, 11]], ["Application", [3, 5, 7, 8, 9, 12]]],
  [["Foundations", [0, 1, 2]], ["Communication", [3, 4, 5, 6, 7]], ["API delivery", [8, 9, 10, 11, 12]]],
  [["Client state", [0, 1, 2, 4]], ["Server state", [3]]],
  [["Databases", [0, 1, 2, 3, 4]], ["Search & vectors", [6, 7, 8]], ["Data design", [5, 9, 10, 11]]],
  [["Foundations", [0, 2, 3, 9]], ["Backend", [1, 4, 5]], ["Pipelines", [6, 7, 8, 10]]],
  [["Models & prompts", [0, 1, 2, 3, 4, 5, 6]], ["Retrieval", [7, 8, 9, 10, 11, 12, 13]], ["Knowledge delivery", [14, 15, 16]]],
  [["Frameworks", [0, 1, 2, 3, 4]], ["Evaluation", [5, 6]], ["Operations", [7, 8]]],
  [["Defenses", [0, 1]], ["Data & governance", [2, 3]]],
  [["Compute & services", [0, 1, 2, 3, 9, 10]], ["AI platforms", [6, 7]], ["Infrastructure", [4, 5, 8, 11, 12]]],
  [["Containers & infra", [0, 1, 5, 6, 7, 8]], ["Delivery", [2, 3, 4]], ["Observability", [9, 10, 11]]],
  [["System design", [0, 1, 2, 3, 4]], ["Application design", [5, 6, 7]], ["Security", [8, 9, 10, 11, 12, 13]]],
  [["Test frameworks", [0, 1, 2, 3]], ["Quality gates", [4, 5]]],
];

export function SkillTree({ category }: { category: number }) {
  const group = skillGroups[category];
  const groups = branches[category];
  const [expanded, setExpanded] = useState<number | null>(Math.min(1, groups.length - 1));
  const [selected, setSelected] = useState<string | null>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const gradient = useId().replace(/:/g, "");

  useLayoutEffect(() => {
    const tree = ref.current;
    if (!tree) return;
    const measure = () => {
      const bounds = tree.getBoundingClientRect();
      const mobile = window.matchMedia("(max-width: 700px)").matches;
      const edges: string[] = [];
      const connect = (from: Element, to: Element, root = false) => {
        const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
        const x1 = (mobile && root ? a.left + a.width / 2 : a.right) - bounds.left;
        const y1 = (mobile && root ? a.bottom : a.top + a.height / 2) - bounds.top;
        const x2 = (mobile && root ? b.left + b.width / 2 : b.left) - bounds.left;
        const y2 = (mobile && root ? b.top : b.top + b.height / 2) - bounds.top;
        edges.push(mobile && root
          ? `M ${x1} ${y1} C ${x1} ${(y1+y2)/2}, ${x2} ${(y1+y2)/2}, ${x2} ${y2}`
          : `M ${x1} ${y1} C ${(x1+x2)/2} ${y1}, ${(x1+x2)/2} ${y2}, ${x2} ${y2}`);
      };
      const root = tree.querySelector("[data-tree-root]");
      if (!root) return;
      tree.querySelectorAll("[data-tree-row]").forEach(row => {
        const branch = row.querySelector("[data-tree-branch]");
        if (!branch) return;
        connect(root, branch, true);
        row.querySelectorAll("[data-tree-leaf]").forEach(leaf => connect(branch, leaf));
      });
      setPaths(edges);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(tree);
    tree.querySelectorAll("button").forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [expanded]);

  return <>
    <div className="graphic-tree" ref={ref}>
      <svg className="graphic-tree-wires" aria-hidden="true">
        <defs><linearGradient id={gradient}><stop stopColor="#a18aff"/><stop offset="1" stopColor="#20ccdf"/></linearGradient></defs>
        {paths.map((d, i) => <g key={`${expanded}-${i}`}><path d={d} stroke={`url(#${gradient})`} className="graphic-tree-wire" pathLength="1"/><path d={d} className="graphic-tree-flow"/></g>)}
      </svg>
      <div className="graphic-tree-root graphic-tree-card" data-tree-root>
        <span className="graphic-tree-symbol" aria-hidden="true">◈</span><div><strong>{group.title}</strong><small>Core technology</small></div>
      </div>
      <div className="graphic-tree-branches">
        {groups.map(([title, indices], i) => <div className="graphic-tree-row" data-tree-row key={title}>
          <button type="button" className="graphic-tree-card graphic-tree-branch" data-tree-branch aria-expanded={expanded === i} aria-controls={`${gradient}-branch-${i}`} onClick={() => { setExpanded(expanded === i ? null : i); setSelected(null); }}>
            <span className="graphic-tree-symbol" aria-hidden="true">{["⌘", "◇", "↗"][i]}</span><span><strong>{title}</strong><small>{indices.length} skills {expanded === i ? "−" : "+"}</small></span>
          </button>
          <div className="graphic-tree-skills" id={`${gradient}-branch-${i}`} hidden={expanded !== i}>
            {expanded === i && indices.map(index => { const item = group.items[index]; return <button type="button" className="graphic-tree-card graphic-tree-skill" data-tree-leaf key={item.name} aria-pressed={selected === item.name} onClick={() => setSelected(item.name)}>
              <span className="graphic-tree-symbol" aria-hidden="true">{item.emoji}</span><span><strong>{item.name}</strong><small>Explore skill</small></span>
            </button>; })}
          </div>
        </div>)}
      </div>
    </div>
    <p className="graphic-tree-caption" aria-live="polite">{selected ? `${selected} · ${group.heading}` : "Select a branch to explore its connected skills."}</p>
  </>;
}
