"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type MouseEventHandler,
} from "react";

interface UseCopyButtonParams {
  state: [checked: boolean, onClick: MouseEventHandler];
  text: string;
}

export function useCopyButton(onCopy: () => void): UseCopyButtonParams {
  const [text, setText] = useState("Copy Code");
  const [checked, setChecked] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const callbackRef = useRef(onCopy);

  callbackRef.current = onCopy;

  const onClick: MouseEventHandler = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setChecked(false);
      setText("Copy Code");
    }, 1500);
    callbackRef.current();
    setChecked(true);
    setText("Copied!");
  }, []);

  // Avoid updates after being unmounted
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return { text, state: [checked, onClick] };
}
