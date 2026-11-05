// ============================================================
// JJ / JOSHY TRAVELS — SHARED SCROLL LOCK MANAGER
// Multi-overlay reference-counted body scroll lock with Lenis sync
// ============================================================

import { useEffect } from "react";

const activeLocks = new Set<string>();

let savedScrollY = 0;
let originalBodyStyles: {
  overflow: string;
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  paddingRight: string;
} | null = null;
let originalDocOverflow = "";

export function acquireScrollLock(lockId: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  if (activeLocks.size === 0) {
    savedScrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;

    const body = document.body;
    originalBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };
    originalDocOverflow = document.documentElement.style.overflow;

    // Prevent layout shift: calculate scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.documentElement.style.overflow = "hidden";

    // Pause Lenis smooth scrolling while overlay is active
    const lenis = (window as unknown as { __lenis?: { stop: () => void } })
      .__lenis;
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }
  }

  activeLocks.add(lockId);
}

export function releaseScrollLock(lockId: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  activeLocks.delete(lockId);

  // Only unlock when all overlays are closed
  if (activeLocks.size === 0 && originalBodyStyles) {
    const body = document.body;
    body.style.position = originalBodyStyles.position;
    body.style.top = originalBodyStyles.top;
    body.style.left = originalBodyStyles.left;
    body.style.right = originalBodyStyles.right;
    body.style.width = originalBodyStyles.width;
    body.style.overflow = originalBodyStyles.overflow;
    body.style.paddingRight = originalBodyStyles.paddingRight;
    document.documentElement.style.overflow = originalDocOverflow;

    originalBodyStyles = null;

    // Restore page scroll position instantly
    window.scrollTo({
      top: savedScrollY,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });

    // Resume Lenis smooth scrolling
    const lenis = (window as unknown as { __lenis?: { start: () => void } })
      .__lenis;
    if (lenis && typeof lenis.start === "function") {
      lenis.start();
    }
  }
}

/**
 * React hook to acquire and release scroll lock for an overlay.
 * Handles mounting/unmounting safety automatically.
 */
export function useScrollLock(isLocked: boolean, lockId: string): void {
  useEffect(() => {
    if (isLocked) {
      acquireScrollLock(lockId);
      return () => {
        releaseScrollLock(lockId);
      };
    }
  }, [isLocked, lockId]);
}
