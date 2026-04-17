"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/engine/elicitation";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const q = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;
  const progress = (step / QUESTIONS.length) * 100;

  function selectOption(val: string, dim: string) {
    setSelected(val);
    setAnswers((prev) => ({ ...prev, [dim]: val }));
  }

  function advance() {
    if (!selected) return;
    if (isLast) {
      sessionStorage.setItem("position_profile", JSON.stringify(answers));
      router.push("/results");
    } else {
      setStep((s) => s + 1);
      setSelected(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f2eb]">
      <div className="max-w-[700px] mx-auto px-5 py-8 pb-16">

        {/* Masthead */}
        <div className="text-center mb-9 pb-6 border-b border-[#ddd9d0]">
          <div className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#8a877f] mb-2.5">
            Philosophical Interlocutor
          </div>
          <h1
            className="text-[28px] font-normal text-[#1c1a15] leading-tight mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            What do you actually believe?
          </h1>
          <p className="text-[13px] text-[#4a4740] max-w-[460px] mx-auto leading-[1.65]">
            Six questions to surface your world model. Then the thinkers who
            share it, oppose it, and would pull the ground from under it — and
            the chance to be questioned by one of them.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex-1 bg-[#ddd9d0] rounded-sm overflow-hidden" style={{ height: "2px" }}>
            <div
              className="h-full bg-[#1c1a15] rounded-sm transition-[width] duration-400"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[11px] text-[#8a877f] whitespace-nowrap font-medium tracking-[0.04em]">
            {step + 1} / {QUESTIONS.length}
          </div>
        </div>

        {/* Question card */}
        <div className="bg-[#faf8f4] border border-[#ddd9d0] rounded-[10px] px-7 py-7 mb-4">
          <div className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#8a877f] mb-3">
            Question {step + 1} of {QUESTIONS.length}
          </div>
          <div
            className="text-[17px] text-[#1c1a15] leading-[1.55] mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {q.text}
          </div>
          <div className="text-[12px] text-[#8a877f] italic leading-[1.6]">
            {q.context}
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2 mb-3.5">
          {q.opts.map((opt) => (
            <button
              key={opt.val}
              onClick={() => selectOption(opt.val, opt.dim)}
              className={`text-left w-full px-4 py-3 border rounded-[6px] transition-colors duration-150 ${
                selected === opt.val
                  ? "border-[#1c1a15] bg-[#f5f2eb]"
                  : "border-[#ddd9d0] bg-[#faf8f4] hover:border-[#8a877f] hover:bg-[#f5f2eb]"
              }`}
            >
              <div className="text-[13px] font-medium text-[#1c1a15] mb-0.5">
                {opt.label}
              </div>
              <div className="text-[12px] text-[#4a4740] leading-[1.45]">
                {opt.sub}
              </div>
            </button>
          ))}
        </div>

        {/* Reveal */}
        {selected && q.reveal[selected] && (
          <div
            className="bg-[#faf8f4] border-l-[3px] border-l-[#1c1a15] rounded-r-[6px] px-4 py-3 mb-3.5 text-[12px] text-[#4a4740] leading-[1.65] [&_strong]:text-[#1c1a15] [&_strong]:font-medium"
            dangerouslySetInnerHTML={{ __html: q.reveal[selected] }}
          />
        )}

        {/* Next */}
        <div className="flex justify-end mt-2">
          <button
            onClick={advance}
            disabled={!selected}
            className="px-[22px] py-[9px] text-[12px] font-medium rounded-[20px] tracking-[0.02em] bg-[#1c1a15] text-[#f5f2eb] border border-[#1c1a15] hover:bg-[#3a3830] disabled:opacity-40 disabled:cursor-default transition-colors duration-150"
          >
            {isLast ? "See my map →" : "Next →"}
          </button>
        </div>

      </div>
    </main>
  );
}
