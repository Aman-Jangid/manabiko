// AnimatedText.jsx
import React from "react";

const AnimatedLogo = ({
  text = "学ぶKo",
  width = 400,
  height = 100,
  textColor = "var(--color-text)",
  backgroundColor = "transparent",
}) => {
  return (
    <div className="animated-text-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        className="animated-svg"
      >
        <rect width="100%" height="100%" fill={backgroundColor} />
        <text
          className="animated-text"
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          stroke={textColor}
          fill={textColor}
        >
          {text}
        </text>
      </svg>

      <style jsx>{`
        .animated-text-container {
          width: 100%;
          max-width: ${width}px;
          margin: 0 auto;
        }

        .animated-svg {
          width: 100%;
          height: auto;
        }

        .animated-text {
          font-size: 50px;
          font-family: "Hachi Maru Pop", "Klee One", "Hiragino Sans", "Meiryo",
            "MS PGothic", sans-serif;
          stroke-width: 1;
          fill-opacity: 0;
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: draw 2s linear infinite;
        }

        @keyframes draw {
          0% {
            stroke-dashoffset: 500;
          }
          80% {
            stroke-dashoffset: 0;
            fill-opacity: 0;
          }
          95% {
            fill-opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            fill-opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
