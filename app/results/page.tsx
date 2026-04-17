import thinkersData from "@/ontology/thinkers.json";
import { ResultsClient } from "./results-client";
import type { Thinker } from "@/lib/engine/types";

export default function ResultsPage() {
  return <ResultsClient thinkers={thinkersData.thinkers as Thinker[]} />;
}
