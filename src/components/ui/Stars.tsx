import { Icon } from "./Icon";

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, color: "#f5b100" }} role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" size={size} style={{ opacity: value >= i - 0.25 ? 1 : 0.25 }} />
      ))}
    </span>
  );
}
