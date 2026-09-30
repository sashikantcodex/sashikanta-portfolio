# Sashikanta Sahoo — Portfolio

Personal site for a senior AI full-stack engineer. Content is taken from the public GitHub profile [sashikantcodex](https://github.com/sashikantcodex).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The project archive is at `/projects`.

## Chat assistant

A popup assistant ([components/chat-widget.tsx](components/chat-widget.tsx)) answers visitor questions using only the content in `lib/data.ts`. It is built on the free, open-source [Vercel AI SDK](https://ai-sdk.dev): `useChat` from `@ai-sdk/react` on the client, and `streamText` with the `@ai-sdk/google` and `@ai-sdk/groq` providers in `app/api/chat/route.ts`.

Add a free key to `.env.local` locally and to Vercel → Settings → Environment Variables:

```bash
GEMINI_API_KEY=...   # free: https://aistudio.google.com/apikey  (gemini-flash-latest → flash-lite fallback)
GROQ_API_KEY=...     # optional free backup: https://console.groq.com/keys (Llama 3.3 70B)
# optional: CHAT_MODEL=gemini-3.8-flash
```

Models are tried in order until one answers, so a rate limit or outage fails over automatically. With no key, or if every model fails, the assistant answers from a local keyword matcher over the same data.

Core profile, tech-stack, and availability questions are answered directly from
`lib/data.ts` before model calls or model quota checks. Wording variants and
combined questions are supported. Detailed questions still use the grounded AI
provider flow. Use the chat header’s reset button to start a fresh conversation.
Run chatbot regressions with `node --test tests/chat.test.cjs`.
