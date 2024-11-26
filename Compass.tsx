import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

interface CompassProps {
  directionAngle?: number;
  snapAngle?: number;
  fixed?: boolean;
  onAngleChanged?: (angle: number) => void;
}

export default function Compass({
  directionAngle = 0,
  snapAngle = 1,
  fixed = true,
  onAngleChanged,
}: CompassProps) {
  const [direction, setDirection] = useState(directionAngle);
  const compassRef = useRef<HTMLDivElement>(null);

  const normalizeAngle = (angle: number) => {
    // Snap to the nearest multiple of snapAngle
    angle = Math.round(angle / snapAngle) * snapAngle;

    while (angle < 0) angle += 360;
    while (angle >= 360) angle -= 360;

    return angle;
  };

  const handleMouseDown = () => {
    if (!fixed) {
      const handleMouseMove = (event: MouseEvent | TouchEvent) => {
        const moveEvent =
          event instanceof MouseEvent ? event : event.touches[0];
        const { clientX, clientY } = moveEvent;

        if (!compassRef.current) return;

        // Get center of the compass
        const rect = compassRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate angle from center
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert to degrees
        angle = normalizeAngle(angle + 90); // Adjust to compass orientation

        setDirection(angle);
        onAngleChanged?.(angle);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleMouseMove);
        document.removeEventListener("touchend", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("touchend", handleMouseUp);
    }
  };

  useEffect(() => {
    setDirection(directionAngle);
  }, [directionAngle]);

  return (
    <div className="compass" ref={compassRef}>
      <div className="compass__windrose">
        <div className="compass__mark--direction-h"></div>
        <div className="compass__mark--direction-v"></div>
        <div className="compass__mark--direction-d1"></div>
        <div className="compass__mark--direction-d2"></div>
      </div>

      <div
        className="compass__arrow-container"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div
          style={{ transform: `rotate(${direction}deg)` }}
          className="compass__arrow"
        ></div>
      </div>
    </div>
  );
}
