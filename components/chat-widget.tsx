"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { profile } from "@/lib/data";
import { guideActions, sectionContexts, suggestedQuestions } from "@/lib/chat-knowledge";
import { useReducedMotion } from "./use-reduced-motion";

type Message = { role: "user" | "assistant"; content: string };

const firstName = profile.name.split(" ")[0];
const STORE = "ss-chat-v2";
const TEASED = "ss-chat-teased";
const TYPED = "ss-chat-typed";
const LAST_VISIT = "ss-chat-last-visit";
const RETURNING = "ss-chat-returning";
const RETURN_AFTER_MS = 30 * 60_000;

type Hello = { title: string; icon: string; message: string };

// Greeting from the visitor's own clock, with a welcome back for repeat visitors.
function hello(returning: boolean): Hello {
  const hour = new Date().getHours();
  const [word, icon] = hour >= 5 && hour < 12 ? ["morning", "☀️"] : hour >= 12 && hour < 17 ? ["afternoon", "🌤️"] : ["evening", "🌙"];
  const title = `Good ${word}`;
  return {
    title,
    icon,
    message: `${returning ? "Welcome back! " : ""}${title} ${icon} May I help you? I'm ${firstName}'s assistant. Ask me about his projects, experience, tech stack, or how to reach him.`,
  };
}

// Whether this browser has visited before, decided once per session so it stays stable across pages.
function isReturning() {
  try {
    const saved = sessionStorage.getItem(RETURNING);
    if (saved) return saved === "1";
    const last = Number(localStorage.getItem(LAST_VISIT) ?? 0);
    const returning = last > 0 && Date.now() - last > RETURN_AFTER_MS;
    sessionStorage.setItem(RETURNING, returning ? "1" : "0");
    return returning;
  } catch {
    return false;
  } finally {
    try { localStorage.setItem(LAST_VISIT, String(Date.now())); } catch { /* Continue without persistence. */ }
  }
}

// Follow the section nearest the middle of the viewport, or the route for other pages.
function useCurrentSection() {
  const pathname = usePathname();
  const [section, setSection] = useState("hero");
  useEffect(() => {
    if (pathname.startsWith("/projects")) { setSection("projects"); return; }
    setSection("hero");
    const nodes = [...document.querySelectorAll<HTMLElement>("main section[id]")].filter((node) =>
      Object.hasOwn(sectionContexts, node.id));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setSection(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    const onScroll = () => window.scrollY < 200 && setSection("hero");
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);
  return section;
}

// Typing dots, then the text typed out, the first time the panel opens in a session.
function useTypewriter(text: string, run: boolean) {
  const [count, setCount] = useState(text.length);
  useEffect(() => {
    if (!run) { setCount(text.length); return; }
    setCount(-1);
    let shown = 0;
    let timer = window.setTimeout(function tick() {
      shown += 2;
      setCount(Math.min(shown, text.length));
      if (shown < text.length) timer = window.setTimeout(tick, 18);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [text, run]);
  return count < 0 ? "" : text.slice(0, count);
}

const textOf = (message: UIMessage) =>
  message.parts.map((part) => (part?.type === "text" && typeof part.text === "string" ? part.text : "")).join("");

// Restore this tab's conversation so it survives page navigation.
function restore(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(STORE) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && Array.isArray(m.parts))
      .map((m, index) => ({
        id: typeof m.id === "string" ? m.id : `restored-${index}`,
        role: m.role as "user" | "assistant",
        parts: [{ type: "text" as const, text: textOf(m) }],
      }))
      .filter((m) => m.parts[0].text.trim())
      .slice(-24);
  } catch {
    return [];
  }
}

// Turn URLs, emails, and the resume path into links; everything else stays text.
function linkify(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+|\/resume\/[\w.-]+)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const raw = match[0].replace(/[.,]$/, "");
    const at = match.index ?? 0;
    parts.push(text.slice(last, at));
    const href = raw.includes("@") && !raw.startsWith("http") ? `mailto:${raw}` : raw;
    parts.push(
      <a key={at} href={href} target={raw.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {raw}
      </a>,
    );
    last = at + raw.length;
  }
  parts.push(text.slice(last));
  return parts;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"guide" | "chat">("guide");
  const launchRef = useRef<HTMLButtonElement>(null);
  const [teaser, setTeaser] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [initial] = useState(restore);
  const reduce = useReducedMotion();
  const section = useCurrentSection();
  const sectionRef = useRef(section);
  useEffect(() => { sectionRef.current = section; }, [section]);
  const [transport] = useState(() => new DefaultChatTransport({
    api: "/api/chat",
    body: () => ({ section: sectionRef.current }),
  }));
  const context = sectionContexts[section] ?? sectionContexts.hero;
  const [greet, setGreet] = useState<Hello>(() => hello(false));
  const [returning, setReturning] = useState(false);
  const [fresh, setFresh] = useState(false);
  const wasOpen = useRef(false);
  const typed = useTypewriter(greet.message, open && fresh && !reduce);
  const greeting: Message = { role: "assistant", content: typed };
  const chips = [...new Set([...context.questions, ...suggestedQuestions])].slice(0, 5);
  const { messages, sendMessage, status, error, clearError, setMessages } = useChat({
    messages: initial,
    transport,
  });
  const busy = status === "submitted" || status === "streaming";
  const shown: Message[] = [
    greeting,
    ...messages.map((m) => ({ role: m.role === "user" ? ("user" as const) : ("assistant" as const), content: textOf(m) })),
  ];
  // Show the typing dots until the first streamed word arrives.
  if (status === "submitted" || (busy && shown.at(-1)?.role === "user")) shown.push({ role: "assistant", content: "" });
  if (error && !busy) shown.push({ role: "assistant", content: `I'm having trouble connecting right now. You can email ${profile.email}.` });

  useEffect(() => {
    const back = isReturning();
    setReturning(back);
    setGreet(hello(back));
    try {
      setFresh(!sessionStorage.getItem(TYPED));
      if (sessionStorage.getItem(TEASED)) return;
    } catch { /* Storage restrictions must not block the chat. */ }
    // Greet each new visit once: open the panel on wide screens, where it sits in a
    // corner, and show the smaller teaser on phones, where the panel would cover the page.
    const timer = window.setTimeout(() => {
      if (window.matchMedia("(min-width: 640px)").matches) setOpen(true);
      else setTeaser(true);
      try { sessionStorage.setItem(TEASED, "1"); } catch { /* Continue without persistence. */ }
    }, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "ready") {
      try { sessionStorage.setItem(STORE, JSON.stringify(messages)); } catch { /* Continue without persistence. */ }
    }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, status, view, open]);

  useEffect(() => {
    if (!open) {
      // Type the greeting only on the first open of a session.
      if (wasOpen.current) {
        setFresh(false);
        try { sessionStorage.setItem(TYPED, "1"); } catch { /* Continue without persistence. */ }
      }
      return;
    }
    wasOpen.current = true;
    // Refresh the time of day in case the tab has been open for hours.
    setGreet(hello(returning));
    setTeaser(false);
    if (view === "chat") inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); launchRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, view, returning]);

  function ask(question: string) {
    const text = question.trim();
    if (!text || busy) return;
    setView("chat");
    setInput("");
    clearError();
    sendMessage({ text });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  return (
    <div className="chat">
      {open && (
        <section className="chat-panel" role="dialog" aria-label={`Chat with ${firstName}'s assistant`}>
          <header className="chat-head">
            <span className="chat-avatar" aria-hidden="true">SS</span>
            <div>
              <strong>{greet.title} <span aria-hidden="true">{greet.icon}</span></strong>
              <small><i /> May I help you?</small>
            </div>
            <button className="chat-reset" disabled={busy || messages.length === 0} onClick={() => { setMessages([]); clearError(); setInput(""); }} aria-label="Start a new conversation" title="Start a new conversation">↺</button>
            <button className="chat-x" aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </header>
          <nav className="chat-tabs" aria-label="Assistant views">
            <button aria-pressed={view === "guide"} onClick={() => setView("guide")}>◇ Guide</button>
            <button aria-pressed={view === "chat"} onClick={() => setView("chat")}>◌ Ask {firstName}</button>
          </nav>
          {view === "guide" ? (
            <div className="chat-guide">
              <Bubble text={greeting.content} full={greet.message} />
              <div className="chat-context">
                <span>📍 You&apos;re viewing <b>{context.label}</b></span>
                {context.questions.map((q) => (
                  <button key={q} disabled={busy} onClick={() => ask(q)}>{q}</button>
                ))}
              </div>
              <p>Or choose a starting point</p>
              {guideActions.map((action) => (
                <button key={action.label} disabled={busy} onClick={() => ask(action.question)}>
                  <span><strong>{action.label}</strong><small>{action.detail}</small></span>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
              <a href={`mailto:${profile.email}`}>Get in touch <span aria-hidden="true">↗</span></a>
            </div>
          ) : <>
          <div className="chat-log" ref={listRef} aria-live="polite">
            <Bubble text={greeting.content} full={greet.message} />
            {shown.slice(1).map((m, i) => (
              <p key={i} className={`chat-msg ${m.role}`}>
                {m.content ? linkify(m.content) : <span className="chat-typing" aria-label="Typing"><i /><i /><i /></span>}
              </p>
            ))}
          </div>
              <div className="chat-chips">
                {chips.map((q) => (
                  <button key={q} disabled={busy} onClick={() => ask(q)}>{q}</button>
                ))}
              </div>
          <form className="chat-form" onSubmit={submit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, availability…"
              maxLength={600}
              aria-label="Your question"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send">↑</button>
          </form>
          </>}
        </section>
      )}
      {teaser && !open && (
        <div className="chat-teaser">
          <button className="chat-teaser-x" aria-label="Dismiss" onClick={() => setTeaser(false)}>×</button>
          <button className="chat-teaser-body" onClick={() => setOpen(true)}>
            {greet.icon} {returning ? "Welcome back! " : ""}{greet.title}! May I help you explore {firstName}&apos;s work?
          </button>
        </div>
      )}
      <button
        ref={launchRef}
        className={`chat-launch${open ? " on" : ""}`}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "×" : (
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm4 7a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 8 11Zm4 0a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 12 11Zm4 0a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 16 11Z" />
          </svg>
        )}
        {!open && <span className="chat-ping" aria-hidden="true" />}
      </button>
    </div>
  );
}

// The greeting bubble: screen readers get the full text once, not every typed character.
function Bubble({ text, full }: { text: string; full: string }) {
  return (
    <p className="chat-msg assistant">
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        {text ? linkify(text) : <span className="chat-typing"><i /><i /><i /></span>}
      </span>
    </p>
  );
}
