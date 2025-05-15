// src/types/gtag.d.ts
export {};

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

declare function gtag(...args: any[]): void;