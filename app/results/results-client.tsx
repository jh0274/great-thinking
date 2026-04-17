"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Thinker, Classification } from "@/lib/engine/types";

interface RankedThinker {
  thinker: Thinker;
  classification: Classification;
  score: number;
}

interface Props {
  thinkers: Thinker[];
}

const DIMS = ["base", "change", "nature", "institution", "epistemic", "method"] as const;

const DIM_LABELS: Record<string, string> = {
  base: "Causal base",
  change: "Mechanism of change",
  nature: "Human nature",
  institution: "Institutions vs power",
  epistemic: "Epistemic confidence",
  method: "Method",
};

const VAL_LABELS: Record<string, Record<string, string>> = {
  base: { material: "Material/productive", psychological: "Psychological", institutional: "Institutional/rational", ideational: "Ideational/cultural" },
  change: { rupture: "Rupture/conflict", design: "Institutional design", gradual: "Gradual formation", emergent: "Spontaneous order" },
  nature: { fixed: "Fixed", variable: "Historically variable", capacity: "Fixed capacities, variable content" },
  institution: { reflects: "Reflects economic power", independent: "Relatively independent", mutual: "Mutually constitutive", cultural: "Downstream of culture" },
  epistemic: { confident: "High confidence", moderate: "Moderate", sceptical: "Sceptical", reject: "Reject design frame" },
  method: { rationalist: "Rationalist", intuitionist: "Intuitionist", critical: "Critical/diagnostic", dialectical: "Dialectical" },
};

const CLASS_LABELS: Record<Classification, string> = {
  neighbour: "Structural neighbour",
  destab: "Destabiliser",
  opponent: "Structural opponent",
};

const CLASS_STYLES: Record<Classification, string> = {
  neighbour: "bg-[#eaf2ec] border-[#a8c9b4] text-[#2d5a3d]",
  destab: "bg-[#f7f0e0] border-[#d4b87a] text-[#7a5a1a]",
  opponent: "bg-[#f5eaea] border-[#c99] text-[#7a2020]",
};

function rankThinkers(profile: Record<string, string>, thinkers: Thinker[]): RankedThinker[] {
  const ORDER: Record<Classification, number> = { neighbour: 0, destab: 1, opponent: 2 };
  return [...thinkers]
    .map((t) => {
      const score = DIMS.filter((d) => profile[d] && t.profile[d] === profile[d]).length;
      const classification: Classification = t.id === "hume" ? "destab" : score >= 2 ? "neighbour" : "opponent";
      return { thinker: t, classification, score };
    })
    .sort((a, b) => ORDER[a.classification] - ORDER[b.classification] || b.score - a.score);
}

export function ResultsClient({ thinkers }: Props) {
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [ranked, setRanked] = useState<RankedThinker[]>([]);

  useEffect(() => {
    const raw = sessionStorage.getItem("position_profile");
    if (!raw) return;
    const p = JSON.parse(raw) as Record<string, string>;
    setProfile(p);
    setRanked(rankThinkers(p, thinkers));
  }, [thinkers]);

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#f5f2eb] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[13px] text-[#4a4740] mb-4">No profile found. Please complete the quiz first.</p>
          <Link href="/" className="text-[12px] text-[#1c1a15] underline">
            Start the quiz →
          </Link>
        </div>
      </main>
    );
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
            Your philosophical map
          </h1>
        </div>

        {/* Profile summary */}
        <div className="bg-[#faf8f4] border border-[#ddd9d0] rounded-[10px] px-5 py-5 mb-5">
          <div className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#8a877f] mb-3.5">
            Your world model
          </div>
          {DIMS.map((d) => (
            <div
              key={d}
              className="flex justify-between items-baseline py-1.5 border-b border-[#ddd9d0] last:border-b-0 gap-3 text-[12px]"
            >
              <span className="text-[#8a877f] shrink-0">{DIM_LABELS[d]}</span>
              <span className="text-[#1c1a15] font-medium text-right">
                {VAL_LABELS[d]?.[profile[d]] ?? "—"}
              </span>
            </div>
          ))}
        </div>

        {/* Results intro */}
        <p className="text-[13px] text-[#4a4740] leading-[1.7] mb-5">
          Your answers reveal a specific set of causal commitments. Below is how
          that model maps onto the history of political thought — who shares your
          architecture, who inverts it, and who would pull the ground from under
          it. Click any thinker to enter a Socratic dialogue with them.
        </p>

        {/* Thinker cards */}
        <div className="flex flex-col gap-2.5 mb-5">
          {ranked.map(({ thinker: t, classification }) => (
            <div
              key={t.id}
              className="border border-[#ddd9d0] rounded-[10px] px-[18px] py-4 bg-[#faf8f4] hover:border-[#8a877f] transition-colors duration-150"
            >
              {/* Card head */}
              <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                  style={{
                    backgroundColor: t.avatar.bg,
                    color: t.avatar.fg,
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {t.avatar.init}
                </div>
                <div>
                  <div
                    className="text-[15px] font-bold text-[#1c1a15]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {t.name}
                  </div>
                  <div className="text-[11px] text-[#8a877f]">{t.dates}</div>
                </div>
                <span
                  className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-[10px] border whitespace-nowrap ${CLASS_STYLES[classification]}`}
                >
                  {CLASS_LABELS[classification]}
                </span>
              </div>

              {/* Description */}
              <div className="text-[12px] text-[#4a4740] leading-[1.65] mb-2">
                {t.desc}
              </div>

              {/* Shared / challenges */}
              <div className="text-[11px] text-[#8a877f] leading-[1.55] border-t border-[#ddd9d0] pt-2 mt-1">
                <strong className="text-[#4a4740] font-medium">Shared commitments:</strong> {t.shared}
                <br />
                <strong className="text-[#4a4740] font-medium">Their challenge to you:</strong> {t.challenges}
              </div>

              {/* Engage button */}
              <Link
                href={`/dialogue/${t.id}`}
                className={`mt-2.5 block w-full text-left px-4 py-[7px] text-[11px] rounded-[16px] border transition-colors duration-150 ${
                  t.id === "marx"
                    ? "bg-[#1c1a15] text-[#e8e4da] border-[#1c1a15] hover:bg-[#2d2b22]"
                    : "bg-transparent text-[#4a4740] border-[#ddd9d0] hover:border-[#8a877f] hover:bg-[#f5f2eb]"
                }`}
              >
                Be questioned by {t.name.split(" ").pop()} →
              </Link>
            </div>
          ))}
        </div>

        {/* Restart */}
        <div className="flex gap-2 mt-4">
          <Link
            href="/"
            className="px-[22px] py-[9px] text-[12px] font-medium rounded-[20px] border border-[#ddd9d0] text-[#4a4740] hover:border-[#8a877f] hover:bg-[#f5f2eb] transition-colors duration-150"
          >
            Start again
          </Link>
        </div>

      </div>
    </main>
  );
}
