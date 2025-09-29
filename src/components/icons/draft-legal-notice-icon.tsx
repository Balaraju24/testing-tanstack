import React from "react";

interface CustomIconProps {
  className?: string;
}

const DraftLegalNoticeIcon: React.FC<CustomIconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor" // 👈 stroke follows currentColor
      strokeMiterlimit={10}
      strokeWidth={2}
    >
      <path d="m51 59h-38v-41.75l12.13-12.25h25.87z" />
      <path d="m25 5v12h-12" />
      <path d="m21 43h22" />
      <path d="m21 48h11" />
      <path d="m21 53h22" />
      <path
        d="m24.93 21.08h3v10h-3z"
        transform="matrix(.866 -.5 .5 .866 -9.5 16.71)"
      />
      <path
        d="m35.32 15.08h3v10h-3z"
        transform="matrix(.866 -.5 .5 .866 -5.11 21.1)"
      />
      <path
        d="m27.13 20.08h9v6h-9z"
        transform="matrix(.866 -.5 .5 .866 -7.3 18.91)"
      />
      <path
        d="m34.38 24.94h3v11h-3z"
        transform="matrix(.866 -.5 .5 .866 -10.41 22.02)"
      />
      <path d="m22 35h9v3h-9z" />
    </svg>
  );
};

export default DraftLegalNoticeIcon;
