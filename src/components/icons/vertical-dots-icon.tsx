export default function VerticalDotsIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="11.9483"
        cy="19.1983"
        r="1.55172"
        transform="rotate(180 11.9483 19.1983)"
        fill="#323B4B"
      />
      <circle
        cx="11.9483"
        cy="11.75"
        r="1.55172"
        transform="rotate(180 11.9483 11.75)"
        fill="#323B4B"
      />
      <circle
        cx="11.9483"
        cy="4.30179"
        r="1.55172"
        transform="rotate(180 11.9483 4.30179)"
        fill="#323B4B"
      />
    </svg>
  );
}
