import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { PROMPT_BUILDERS } from "@/lib/engine/prompts";
import type { PositionProfile } from "@/lib/engine/types";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { thinkerId, profile, history } = await req.json() as {
    thinkerId: string;
    profile: PositionProfile;
    history: { role: string; content: string }[];
  };

  const buildPrompt = PROMPT_BUILDERS[thinkerId];
  if (!buildPrompt) {
    return NextResponse.json({ error: "Unknown thinker" }, { status: 400 });
  }

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 200,
    system: buildPrompt(profile),
    messages: history as Anthropic.MessageParam[],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
  }

  return NextResponse.json({ text: content.text });
}
