import { StatusBadge } from "./StatusBadge";
import { formatRisk } from "../../utils/formatters";

export function HazardSeverityTag({ title = "HazardSeverityTag", value = "READY", severity }: { title?: string; value?: string; severity?: string }) {
  if (!severity) {
    return <div className="shared-widget"><strong>{title}</strong><StatusBadge value={value} /></div>;
  }
  return <span className={"tag tag-sev-" + severity.toLowerCase()}>{formatRisk(severity)}</span>;
}
