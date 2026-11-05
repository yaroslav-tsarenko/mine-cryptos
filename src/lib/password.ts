export const PASSWORD_RULES = [
  { id: "len", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { id: "case", label: "Upper & lower case", test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  { id: "num", label: "At least one number", test: (p: string) => /\d/.test(p) },
  { id: "sym", label: "At least one symbol", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

const LEVELS = [
  { label: "Too weak", color: "var(--danger)" },
  { label: "Weak", color: "#f97316" },
  { label: "Fair", color: "#eab308" },
  { label: "Good", color: "#22c55e" },
  { label: "Strong", color: "var(--success)" },
];

export function scorePassword(p: string) {
  const passed = PASSWORD_RULES.filter((r) => r.test(p)).length;
  const bonus = p.length >= 14 ? 1 : 0;
  const score = p ? Math.min(4, Math.max(passed - 1 + bonus, passed > 0 ? 1 : 0)) : 0;
  return { score, ...LEVELS[score], passed };
}
