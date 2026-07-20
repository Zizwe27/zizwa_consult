"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";

export function MagneticButton({
  children,
  className = "",
  as: Tag = "button",
  strength = 0.3,
  ...props
}: {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  strength?: number;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || window.matchMedia("(pointer: coarse)").matches)
        return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setTransform(`translate(${x * strength}px, ${y * strength}px)`);
    },
    [strength]
  );

  const handleLeave = useCallback(() => {
    setTransform("translate(0px, 0px)");
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        transform,
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
