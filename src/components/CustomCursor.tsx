import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive or image elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [data-cursor]');
      const imageElement = target.closest('[data-cursor-image]');

      if (imageElement) {
        setIsHovered(true);
        setCursorText('VIEW');
      } else if (interactive) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Smooth trailing effect
  useEffect(() => {
    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: lerp(prev.x, position.x, 0.2),
        y: lerp(prev.y, position.y, 0.2),
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };

    animationFrameId = requestAnimationFrame(updateTrailing);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        className="pointer-events-none fixed z-50 rounded-full bg-[#c5a880] transition-opacity duration-200"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '0px' : '4px',
          height: isHovered ? '0px' : '4px',
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Expanding trailing ring */}
      <div
        className="pointer-events-none fixed z-50 flex items-center justify-center rounded-full border transition-all duration-300 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? (cursorText ? '64px' : '38px') : '26px',
          height: isHovered ? (cursorText ? '64px' : '38px') : '26px',
          transform: 'translate(-50%, -50%)',
          borderColor: isHovered ? '#c5a880' : 'rgba(197, 168, 128, 0.4)',
          backgroundColor: isHovered ? (cursorText ? 'rgba(10, 10, 10, 0.85)' : 'rgba(197, 168, 128, 0.08)') : 'transparent',
          backdropFilter: cursorText ? 'blur(4px)' : 'none',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {cursorText && (
          <span className="text-[10px] tracking-widest font-medium text-[#f5f2eb]">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
