export default function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff8b3" />
          <stop offset="40%" stopColor="#ffcc00" />
          <stop offset="100%" stopColor="#cc9900" />
        </radialGradient>
      </defs>
      <path
        fill="url(#innerGlow)"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24
       l-7.19-.61L12 2 9.19 8.63 2 9.24
       l5.46 4.73L5.82 21z"
      />
    </svg>
  );
}
