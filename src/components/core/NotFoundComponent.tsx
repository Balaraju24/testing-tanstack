import NotFound from "../icons/404";

export default function NotFoundComponent() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-4 z-9999">
      <NotFound />
      <span className="text-2xl font-semibold mb-2 text-gray-900">
        This Page isn't available
      </span>
    </div>
  );
}
