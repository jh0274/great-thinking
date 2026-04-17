"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Thinker } from "@/lib/engine/types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  thinker: Thinker;
}

function formatContent(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\])/);
  return parts.map((part, i) => {
    if (/^\[[^\]]+\]$/.test(part)) {
      return (
        <span
          key={i}
          className="inline-block text-[9px] font-medium tracking-[0.1em] uppercase text-[#c8a96e] border border-[#4a4535] px-1.5 py-px rounded-full mr-1 mb-2"
          style={{ fontFamily: "var(--font-sans-app)" }}
        >
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
}

export function DialogueClient({ thinker }: Props) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [noProfile, setNoProfile] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const storageKey = `dialogue_history_${thinker.id}`;

  useEffect(() => {
    const raw = sessionStorage.getItem("position_profile");
    if (!raw) { setNoProfile(true); return; }
    const p = JSON.parse(raw) as Record<string, string>;
    setProfile(p);

    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      setMessages(JSON.parse(saved) as Message[]);
    } else {
      // Kick off opening question
      getOpeningMessage(p);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function getOpeningMessage(p: Record<string, string>) {
    setLoading(true);
    try {
      const res = await fetch("/api/dialogue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          thinkerId: thinker.id,
          profile: p,
          // Seed the conversation so the thinker can open
          history: [{ role: "user", content: "Begin." }],
        }),
      });
      const data = await res.json() as { text?: string; error?: string };
      const reply = data.text ?? "[No response]";
      const opened: Message[] = [{ role: "assistant", content: reply }];
      setMessages(opened);
      sessionStorage.setItem(storageKey, JSON.stringify(opened));
    } catch {
      setMessages([{ role: "assistant", content: "[Error reaching the API. Please try again.]" }]);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading || !profile) return;

    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "";
    }

    const withUser: Message[] = [...messages, { role: "user", content: text }];
    setMessages(withUser);
    setLoading(true);

    try {
      // Prepend seed so Anthropic receives valid alternating history
      const apiHistory = [
        { role: "user", content: "Begin." },
        ...withUser.map((m) => ({ role: m.role, content: m.content })),
      ];
      const res = await fetch("/api/dialogue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thinkerId: thinker.id, profile, history: apiHistory }),
      });
      const data = await res.json() as { text?: string; error?: string };
      const reply = data.text ?? "[No response]";
      const final: Message[] = [...withUser, { role: "assistant", content: reply }];
      setMessages(final);
      sessionStorage.setItem(storageKey, JSON.stringify(final));
    } catch {
      setMessages([...withUser, { role: "assistant", content: "[Error reaching the API. Please try again.]" }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "";
    el.style.height = el.scrollHeight + "px";
  }

  if (noProfile) {
    return (
      <main className="min-h-screen bg-[#f5f2eb] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[13px] text-[#4a4740] mb-4">No profile found. Please complete the quiz first.</p>
          <button
            onClick={() => router.push("/")}
            className="text-[12px] text-[#1c1a15] underline"
          >
            Start the quiz →
          </button>
        </div>
      </main>
    );
  }

  const thinkerLastName = thinker.name.split(" ").pop()!;

  return (
    <main className="min-h-screen bg-[#f5f2eb]">
      <div className="max-w-[700px] mx-auto px-5 py-8 pb-8">

        {/* Header */}
        <div className="flex items-center gap-3.5 pb-[18px] mb-5 border-b border-[#ddd9d0]">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0"
            style={{
              backgroundColor: thinker.avatar.bg,
              color: thinker.avatar.fg,
              fontFamily: "var(--font-serif)",
            }}
          >
            {thinker.avatar.init}
          </div>
          <div className="flex-1">
            <div
              className="text-[17px] text-[#1c1a15] mb-0.5"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {thinker.name}
            </div>
            <div className="text-[11px] text-[#8a877f]">
              {thinker.dates} · Speaking in their own voice
            </div>
          </div>
          <button
            onClick={() => router.push("/results")}
            className="text-[11px] text-[#8a877f] hover:text-[#1c1a15] bg-none border-none cursor-pointer py-1 transition-colors duration-150"
          >
            ← Back
          </button>
        </div>

        {/* Move legend */}
        <div
          className="mb-4 px-3.5 py-2.5 bg-[#faf8f4] border border-[#ddd9d0] rounded-[6px] text-[11px] text-[#8a877f] leading-[1.6] [&_strong]:text-[#4a4740] [&_strong]:font-medium"
          dangerouslySetInnerHTML={{ __html: thinker.moveLegend }}
        />

        {/* Chat messages */}
        <div className="flex flex-col gap-3.5 mb-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col gap-1 ${m.role === "user" ? "items-end" : ""}`}>
              <div
                className={`text-[10px] font-medium tracking-[0.07em] uppercase ${
                  m.role === "user" ? "text-[#8a877f]" : "text-[#8a877f]"
                }`}
              >
                {m.role === "user" ? "You" : thinkerLastName}
              </div>
              <div
                className={`text-[13px] leading-[1.7] max-w-[90%] px-4 py-3 ${
                  m.role === "assistant"
                    ? "bg-[#1c1a15] text-[#e8e4da] rounded-[2px_10px_10px_10px]"
                    : "bg-[#faf8f4] border border-[#ddd9d0] text-[#1c1a15] rounded-[10px_2px_10px_10px]"
                }`}
                style={m.role === "assistant" ? { fontFamily: "var(--font-serif)" } : undefined}
              >
                {m.role === "assistant" ? formatContent(m.content) : m.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex flex-col gap-1">
              <div className="text-[10px] font-medium tracking-[0.07em] uppercase text-[#8a877f]">
                {thinkerLastName}
              </div>
              <div className="bg-[#1c1a15] rounded-[2px_10px_10px_10px] px-4 py-3 flex items-center gap-1.5 w-fit">
                {[0, 200, 400].map((delay) => (
                  <div
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-[#8a877f] animate-pulse"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div className="flex gap-2 items-end bg-[#faf8f4] border border-[#ddd9d0] rounded-[10px] px-3 py-2.5">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Your response…"
            rows={1}
            disabled={loading}
            className="flex-1 border-none bg-transparent text-[13px] text-[#1c1a15] resize-none outline-none leading-[1.5] min-h-[22px] max-h-[120px] overflow-y-auto placeholder:text-[#8a877f] disabled:opacity-60"
            style={{ fontFamily: "var(--font-sans-app)" }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-3.5 py-1.5 bg-[#1c1a15] text-[#f5f2eb] border-none rounded-[16px] text-[12px] font-medium cursor-pointer shrink-0 hover:bg-[#3a3830] disabled:opacity-40 disabled:cursor-default transition-colors duration-150"
            style={{ fontFamily: "var(--font-sans-app)" }}
          >
            Send
          </button>
        </div>

        {/* Session info */}
        <div className="text-[11px] text-[#8a877f] text-center mt-3 leading-[1.5]">
          {messages.length > 1
            ? `${Math.floor(messages.length / 2)} exchange${Math.floor(messages.length / 2) !== 1 ? "s" : ""} · history saved in this session`
            : "history saved in this session"}
        </div>

      </div>
    </main>
  );
}
