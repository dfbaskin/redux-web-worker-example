import { useEffect, RefObject, useState, DependencyList } from "react";

function debounce(fn: () => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, delay);
  };
}

export function useWindowReisze(
  resizeCallback: () => void,
  deps?: DependencyList
): void {
  useEffect(() => {
    const onResize = debounce(resizeCallback, 300);
    window.addEventListener("resize", onResize);
    resizeCallback();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, deps);
}
