"use client";

import React, { useState, useRef, useEffect, KeyboardEvent, TouchEvent, MouseEvent as ReactMouseEvent } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After"
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: globalThis.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div 
      className="relative w-full h-[500px] overflow-hidden rounded-xl select-none"
      ref={containerRef}
      onMouseDown={(e: ReactMouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e: TouchEvent<HTMLDivElement>) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Background) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
      >
        <span className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm font-medium">
          {afterLabel}
        </span>
      </div>

      {/* Before Image (Clipped overlay) */}
      <div 
        className="absolute inset-0 bg-cover bg-center border-r-2 border-white"
        style={{ 
          backgroundImage: `url(${beforeImage})`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <span className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-sm font-medium">
          {beforeLabel}
        </span>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
        role="slider"
        aria-valuenow={sliderPosition}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Before/After image comparison slider"
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
            <path d="M11 17l-5-5 5-5M13 17l5-5-5-5"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
