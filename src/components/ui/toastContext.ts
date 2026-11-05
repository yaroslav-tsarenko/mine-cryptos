import { createContext } from "react";

export type ToastKind = "success" | "error" | "info";
export type ToastInput = { title: string; description?: string; kind?: ToastKind };
export type ToastApi = { notify: (toast: ToastInput) => void };

export const ToastContext = createContext<ToastApi | null>(null);
