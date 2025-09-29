import { Toaster as Sonner } from "sonner";
type ToasterProps = React.ComponentProps<typeof Sonner>;
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      duration={2500}
      className="fixed top-10  z-60"
      toastOptions={{
        classNames: {
          toast:
            "bg-white text-black shadow-lg flex gap-2 border border-gray-200 rounded-lg p-4",
          description: "text-gray-600",
          actionButton: "!bg-transparent  !border-none !text-black  rounded",
          cancelButton: "bg-gray-300 text-gray-700  rounded",
        },
      }}
      {...props}
    />
  );
};
export { Toaster };
