import * as React from "react";

export const BeeBotSvg = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => {
  return (
    <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="50" cy="60" rx="35" ry="30" fill="black" fillOpacity="0.18" />
      <path
        d="M50 95C75 95 90 80 90 50C90 20 75 5 50 5C25 5 10 20 10 50C10 80 25 95 50 95Z"
        fill="#FBBF24"
        stroke="#111827"
        strokeWidth="2.5"
      />
      <path d="M18 30H82" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
      <path d="M14 52H86" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
      <path d="M18 74H82" stroke="#111827" strokeWidth="7" strokeLinecap="round" />
      <circle cx="35" cy="18" r="8" fill="white" stroke="#111827" strokeWidth="2" />
      <circle cx="65" cy="18" r="8" fill="white" stroke="#111827" strokeWidth="2" />
      <circle cx="35" cy="18" r="3" fill="black" />
      <circle cx="65" cy="18" r="3" fill="black" />
      <rect x="2" y="40" width="8" height="20" rx="2" fill="#374151" />
      <rect x="90" y="40" width="8" height="20" rx="2" fill="#374151" />
    </svg>
  );
});

BeeBotSvg.displayName = "BeeBotSvg";
