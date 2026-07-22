import { useCallback, useRef, useState } from "react";

/**
 * Attaches a passive window scroll listener via a ref callback (mounted once
 * on the app root) instead of useEffect, tracking which section is active.
 */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const handlerRef = useRef<() => void>();

  const rootRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + 120;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActive(id);
            break;
          }
        }
      };
      handlerRef.current = handleScroll;
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    } else if (handlerRef.current) {
      window.removeEventListener("scroll", handlerRef.current);
      handlerRef.current = undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { active, rootRef };
}
