const UploadIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.5 15.577V6.927L9.17 9.257L8.462 8.539L12 5L15.539 8.539L14.831 9.258L12.5 6.927V15.577H11.5ZM5 19V14.962H6V18H18V14.962H19V19H5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default UploadIcon;
