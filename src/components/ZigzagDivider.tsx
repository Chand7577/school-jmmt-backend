import React from "react";

interface ZigzagDividerProps {
  color?: string; // fill color of the zigzag
  height?: number; // height in px
  inverted?: boolean;
  className?: string;
}

export const ZigzagDivider: React.FC<ZigzagDividerProps> = ({
  color = "#FDFBF7",
  height = 32,
  inverted = false,
  className = "",
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${className}`}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-full block"
        style={{ transform: inverted ? "rotate(180deg)" : "none" }}
      >
        <path
          d="M0,20 C50,0 100,40 150,20 C200,0 250,40 300,20 C350,0 400,40 450,20 C500,0 550,40 600,20 C650,0 700,40 750,20 C800,0 850,40 900,20 C950,0 1000,40 1050,20 C1100,0 1150,40 1200,20 L1200,40 L0,40 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default ZigzagDivider;
