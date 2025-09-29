const DropdownIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      className={className}
    >
      <path
        d="M6.28696 7.3C6.00844 7.65588 5.46982 7.65588 5.1913 7.3L0.358219 1.12439C0.000850365 0.667751 0.326195 4.09955e-07 0.906049 4.60647e-07L10.5722 1.30569e-06C11.1521 1.35638e-06 11.4774 0.667752 11.12 1.12439L6.28696 7.3Z"
        fill="black"
      />
    </svg>
  );
};

export default DropdownIcon;
