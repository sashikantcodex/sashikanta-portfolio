"use client";

import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { skillGroups } from "@/lib/data";

export function StackGrid() {
  const [active, setActive] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [pill, setPill] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const group = skillGroups[active];

  const track = (event: MouseEvent<HTMLDivElement>) => {
    const node = rootRef.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    node.style.setProperty("--sx", `${event.clientX - box.left}px`);
    node.style.setProperty("--sy", `${event.clientY - box.top}px`);
  };

  useLayoutEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab) return;
    const place = () => {
      const listBox = list.getBoundingClientRect();
      const tabBox = tab.getBoundingClientRect();
      setPill({
        left: tabBox.left - listBox.left,
        top: tabBox.top - listBox.top,
        width: tabBox.width,
        height: tabBox.height,
      });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  const move = (step: number) => {
    const next = (active + step + skillGroups.length) % skillGroups.length;
    setActive(next);
    setSelectedSkill(null);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="stack-studio" ref={rootRef} onMouseMove={track}>
      <div className="stack-field" aria-hidden="true">
        <span className="stack-ring" />
        <span className="stack-ring" />
        <span className="stack-scan" />
      </div>
      <div
        className="stack-tabs"
        role="tablist"
        aria-label="Tool categories"
        ref={listRef}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <span
          className="stack-pill"
          style={{ left: pill.left, top: pill.top, width: pill.width, height: pill.height, opacity: pill.width ? 1 : 0 }}
        />
        {skillGroups.map((item, index) => (
          <button
            key={item.title}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`stack-tab-${index}`}
            aria-selected={index === active}
            aria-controls="stack-panel"
            tabIndex={index === active ? 0 : -1}
            className={`stack-tab${index === active ? " on" : ""}`}
            onClick={() => { setActive(index); setSelectedSkill(null); }}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div
        className="stack-panel"
        role="tabpanel"
        id="stack-panel"
        aria-labelledby={`stack-tab-${active}`}
        key={group.title}
      >
        <p className="stack-layer">{group.heading}</p>
        <div className="skill-tree">
          <div className="skill-tree-root">
            <span aria-hidden="true">◈</span>
            <strong>{group.title}</strong>
            <small>{group.items.length} connected skills</small>
          </div>
          <ul className="skill-tree-leaves" aria-label={`${group.title} skills`}>
            {group.items.map((item, index) => (
              <li className="skill-tree-leaf" key={item.name} style={{ animationDelay: `${index * 45}ms` }}>
                <button
                  type="button"
                  className="skill-tree-node"
                  aria-pressed={selectedSkill === item.name}
                  onClick={() => setSelectedSkill(selectedSkill === item.name ? null : item.name)}
                >
                  <span className="skill-tree-icon" aria-hidden="true">{item.emoji}</span>
                  <span>{item.name}</span>
                  <span className="skill-tree-dot" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <p className="skill-tree-caption" aria-live="polite">
            {selectedSkill ? `${selectedSkill} · ${group.heading}` : "Explore a category, then select a skill along its branches."}
          </p>
        </div>
      </div>
    </div>
  );
}
