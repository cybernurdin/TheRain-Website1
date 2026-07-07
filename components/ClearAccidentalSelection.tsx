"use client";

import { useEffect } from "react";

export default function ClearAccidentalSelection() {
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handlePointerDown = (event: PointerEvent) => {
      startX = event.clientX;
      startY = event.clientY;
    };

    const handlePointerUp = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) return;

      const isEditable = target.closest('input, textarea, select, [contenteditable="true"], pre, code');

      if (isEditable) return;

      const movedX = Math.abs(event.clientX - startX);
      const movedY = Math.abs(event.clientY - startY);

      if (movedX < 5 && movedY < 5) {
        window.getSelection()?.removeAllRanges();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return null;
}
