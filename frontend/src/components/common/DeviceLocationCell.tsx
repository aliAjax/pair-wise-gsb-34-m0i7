import type { FireDevice } from "../../types/FireDevice";
import { DeviceTypeText } from "../../constants/DeviceType";
import type { DeviceType } from "../../types/DeviceType";

export function DeviceLocationCell({ device }: { device: FireDevice | null }) {
  if (!device) return <span>-</span>;
  return (
    <div className="device-cell">
      <strong>{device.device_code}</strong>
      <span>{DeviceTypeText[device.device_type as DeviceType] ?? device.device_type}</span>
      <span>{device.floor} · {device.location_desc}</span>
    </div>
  );
}
