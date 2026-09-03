'use client';

import { useState, useEffect } from "react";

interface CursorFollowerProps {
  size?: number;
  color?: string;
  delayDuration?: string;
}

export default function CursorFollower({size = 30, color = 'bg-linear-to-b from-[#66e0ff] from-5% via-[#6ec0ff] via-75%  to-[#5fa0fa]', delayDuration = 'duration-100'}: CursorFollowerProps) {
  const [position, setPosition] = useState({x: -100, y: -100});

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({x: e.clientX, y: e.clientY});
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  const halfSize = size / 2;

  return (
    <div
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 opacity-60 transition-transform ease-out ${delayDuration} ${color}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate3d(${position.x - halfSize}px, ${position.y - halfSize}px, 0)`,
      }}
    >
    </div>
  )
}