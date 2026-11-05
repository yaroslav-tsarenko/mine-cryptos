/** Copies text, falling back to a hidden textarea when the async Clipboard API is unavailable or blocked. */
export async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    // Content outside an open modal <dialog> is inert, so attach inside it when present.
    (document.querySelector("dialog[open]") ?? document.body).appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    if (!ok) throw new Error("Copy failed");
  }
}
