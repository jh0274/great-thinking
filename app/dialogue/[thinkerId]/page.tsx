import thinkersData from "@/ontology/thinkers.json";
import { DialogueClient } from "./dialogue-client";
import type { Thinker } from "@/lib/engine/types";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ thinkerId: string }> };

export default async function DialoguePage({ params }: Props) {
  const { thinkerId } = await params;
  const thinker = (thinkersData.thinkers as Thinker[]).find((t) => t.id === thinkerId);
  if (!thinker) notFound();
  return <DialogueClient thinker={thinker} />;
}
