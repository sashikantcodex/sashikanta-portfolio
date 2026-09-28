"use client";

import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { skillGroups, type Skill } from "@/lib/data";

function ToolMark({ item }: { item: Skill }) {
  return (
    <span className="stack-emoji" aria-hidden="true">
      {item.emoji}
    </span>
  );
}

function StackCard({ item, index }: { item: Skill; index: number }) {
  const ref = useRef<HTMLLIElement>(null);

  const tilt = (event: MouseEvent<HTMLLIElement>) => {
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    node.style.setProperty("--rx", `${(-y * 9).toFixed(2)}deg`);
    node.style.setProperty("--ry", `${(x * 11).toFixed(2)}deg`);
  };

  const rest = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <li
      className="stack-card"
      ref={ref}
      style={{ animationDelay: `${index * 55}ms`, ["--i" as string]: index }}
      onMouseMove={tilt}
      onMouseLeave={rest}
    >
      <div className="stack-frame">
        <div className="stack-face">
          <span className="stack-sheen" aria-hidden="true" />
          <ToolMark item={item} />
          <span className="stack-name">{item.name}</span>
        </div>
      </div>
    </li>
  );
}

export function StackGrid() {
  const [active, setActive] = useState(0);
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
            onClick={() => setActive(index)}
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
        <ul>
          {group.items.map((item, index) => (
            <StackCard key={item.name} item={item} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
}
