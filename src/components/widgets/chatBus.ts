export const OPEN_CHAT_EVENT = "mc:open-chat";

export function openSupportChat() {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
}
