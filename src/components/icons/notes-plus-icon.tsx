const NotesPlusIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
    >
      <path
        d="M0.875 6H6.5M6.5 6H12.125M6.5 6V0.375M6.5 6V11.625"
        stroke="#434343"
        strokeWidth="1.40625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NotesPlusIcon;
