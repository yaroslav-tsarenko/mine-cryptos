import { hashString } from "../../lib/random";

const GRADIENTS = [
  "linear-gradient(135deg,#7f8ef0,#c47ef0)",
  "linear-gradient(135deg,#86d9f4,#7f8ef0)",
  "linear-gradient(135deg,#f590f5,#8b7cf6)",
  "linear-gradient(135deg,#3f28c6,#b04fe6)",
  "linear-gradient(135deg,#5ad1c8,#3f6ff0)",
];

/** Initials avatar on a brand gradient (no stock photos of real people needed). */
export function Avatar({ name, size = 44, src }: { name: string; size?: number; src?: string }) {
  if (src) {
    return <img src={src} alt="" width={size} height={size} loading="lazy" style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flex: "none" }} />;
  }
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        flex: "none",
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: GRADIENTS[hashString(name) % GRADIENTS.length],
        color: "#fff",
        fontWeight: 700,
        fontSize: size * 0.38,
        letterSpacing: "0.02em",
      }}
    >
      {initials}
    </span>
  );
}
