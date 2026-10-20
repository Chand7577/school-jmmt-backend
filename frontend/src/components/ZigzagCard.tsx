import React, { useId } from "react";

interface ZigzagCardProps {
  children: React.ReactNode;
  color?: string; // background color of the card, e.g. '#1E2A44', '#ffffff', '#3b0764'
  toothSize?: number; // size of zigzag teeth in px, default 8
  variant?: "zigzag" | "scallop";
  className?: string;
  innerClassName?: string;
  shadow?: boolean;
}

export const ZigzagCard: React.FC<ZigzagCardProps> = ({
  children,
  color = "#1E2A44",
  toothSize = 8,
  variant = "zigzag",
  className = "",
  innerClassName = "",
  shadow = true,
}) => {
  const uniqueId = useId().replace(/:/g, "");
  const toothWidth = toothSize * 2;

  // Pattern definitions for top, bottom, left, right
  const topPatternId = `zigzag-top-${uniqueId}`;
  const bottomPatternId = `zigzag-bottom-${uniqueId}`;
  const leftPatternId = `zigzag-left-${uniqueId}`;
  const rightPatternId = `zigzag-right-${uniqueId}`;

  return (
    <div
      className={`relative ${
        shadow ? "filter drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300" : ""
      } ${className}`}
      style={{ padding: toothSize }}
    >
      {/* SVG Pattern Definitions */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Top Edge Pattern */}
          <pattern
            id={topPatternId}
            width={toothWidth}
            height={toothSize}
            patternUnits="userSpaceOnUse"
          >
            {variant === "zigzag" ? (
              <polygon
                points={`0,${toothSize} ${toothSize},0 ${toothWidth},${toothSize}`}
                fill={color}
              />
            ) : (
              <path
                d={`M0,${toothSize} A${toothSize},${toothSize} 0 0,1 ${toothWidth},${toothSize} Z`}
                fill={color}
              />
            )}
          </pattern>

          {/* Bottom Edge Pattern */}
          <pattern
            id={bottomPatternId}
            width={toothWidth}
            height={toothSize}
            patternUnits="userSpaceOnUse"
          >
            {variant === "zigzag" ? (
              <polygon
                points={`0,0 ${toothSize},${toothSize} ${toothWidth},0`}
                fill={color}
              />
            ) : (
              <path
                d={`M0,0 A${toothSize},${toothSize} 0 0,0 ${toothWidth},0 Z`}
                fill={color}
              />
            )}
          </pattern>

          {/* Left Edge Pattern */}
          <pattern
            id={leftPatternId}
            width={toothSize}
            height={toothWidth}
            patternUnits="userSpaceOnUse"
          >
            {variant === "zigzag" ? (
              <polygon
                points={`${toothSize},0 0,${toothSize} ${toothSize},${toothWidth}`}
                fill={color}
              />
            ) : (
              <path
                d={`M${toothSize},0 A${toothSize},${toothSize} 0 0,0 ${toothSize},${toothWidth} Z`}
                fill={color}
              />
            )}
          </pattern>

          {/* Right Edge Pattern */}
          <pattern
            id={rightPatternId}
            width={toothSize}
            height={toothWidth}
            patternUnits="userSpaceOnUse"
          >
            {variant === "zigzag" ? (
              <polygon
                points={`0,0 ${toothSize},${toothSize} 0,${toothWidth}`}
                fill={color}
              />
            ) : (
              <path
                d={`M0,0 A${toothSize},${toothSize} 0 0,1 0,${toothWidth} Z`}
                fill={color}
              />
            )}
          </pattern>
        </defs>
      </svg>

      {/* Top Zigzag Edge — sits in the top padding lane */}
      <div
        className="absolute left-0 right-0 overflow-hidden pointer-events-none z-10"
        style={{ top: 0, height: toothSize }}
      >
        <svg width="100%" height={toothSize} className="block">
          <rect width="100%" height={toothSize} fill={`url(#${topPatternId})`} />
        </svg>
      </div>

      {/* Bottom Zigzag Edge — sits in the bottom padding lane */}
      <div
        className="absolute left-0 right-0 overflow-hidden pointer-events-none z-10"
        style={{ bottom: 0, height: toothSize }}
      >
        <svg width="100%" height={toothSize} className="block">
          <rect width="100%" height={toothSize} fill={`url(#${bottomPatternId})`} />
        </svg>
      </div>

      {/* Left Zigzag Edge — sits in the left padding lane */}
      <div
        className="absolute top-0 bottom-0 overflow-hidden pointer-events-none z-10"
        style={{ left: 0, width: toothSize }}
      >
        <svg width={toothSize} height="100%" className="block">
          <rect width={toothSize} height="100%" fill={`url(#${leftPatternId})`} />
        </svg>
      </div>

      {/* Right Zigzag Edge — sits in the right padding lane */}
      <div
        className="absolute top-0 bottom-0 overflow-hidden pointer-events-none z-10"
        style={{ right: 0, width: toothSize }}
      >
        <svg width={toothSize} height="100%" className="block">
          <rect width={toothSize} height="100%" fill={`url(#${rightPatternId})`} />
        </svg>
      </div>

      {/* Four Corner Bridge Squares (fill the corner gaps between edge strips) */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          top: 0,
          left: 0,
          width: toothSize,
          height: toothSize,
          backgroundColor: color,
        }}
      />
      <div
        className="absolute pointer-events-none z-10"
        style={{
          top: 0,
          right: 0,
          width: toothSize,
          height: toothSize,
          backgroundColor: color,
        }}
      />
      <div
        className="absolute pointer-events-none z-10"
        style={{
          bottom: 0,
          left: 0,
          width: toothSize,
          height: toothSize,
          backgroundColor: color,
        }}
      />
      <div
        className="absolute pointer-events-none z-10"
        style={{
          bottom: 0,
          right: 0,
          width: toothSize,
          height: toothSize,
          backgroundColor: color,
        }}
      />

      {/* Main Inner Card Body */}
      <div
        className={`relative z-0 h-full ${innerClassName}`}
        style={{ backgroundColor: color }}
      >
        {children}
      </div>
    </div>
  );
};

export default ZigzagCard;
