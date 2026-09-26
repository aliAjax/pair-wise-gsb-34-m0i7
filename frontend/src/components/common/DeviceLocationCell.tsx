import { StatusBadge } from "./StatusBadge";
import type { FireDevice } from "../../types/FireDevice";

export function DeviceLocationCell({ title = "DeviceLocationCell", value = "READY", device }: { title?: string; value?: string; device?: FireDevice | null }) {
  if (!device) {
    return <div className="shared-widget"><strong>{title}</strong><StatusBadge value={value} /></div>;
  }
  return <div className="device-cell">
    <strong>{device.device_code}</strong>
    <span className="meta">{device.device_type} · {device.floor} · {device.location_desc}</span>
    <StatusBadge value={device.status} />
  </div>;
}
