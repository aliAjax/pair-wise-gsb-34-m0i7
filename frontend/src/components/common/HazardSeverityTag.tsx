import { formatRisk } from "../../utils/formatters";

const SEVERITY_CLASS: Record<string, string> = {
  CRITICAL: "sev-critical",
  HIGH: "sev-high",
  MEDIUM: "sev-medium",
  LOW: "sev-low"
};

export function HazardSeverityTag({ value }: { value: string }) {
  return <span className={"severity-tag " + (SEVERITY_CLASS[value] ?? "")}>{formatRisk(value)}</span>;
}
