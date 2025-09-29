import SomethingWentWrong from "../icons/something-went-wrong";
import { Button } from "../ui/button";

function NetworkErrorFallback({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center text-center text-red-600 p-6 space-y-4 min-h-screen">
      <SomethingWentWrong />
      <h2 className="text-2xl font-bold text-gray-800">
        Oops! Something went wrong.
      </h2>
      <p className="text-gray-600 max-w-md">{error.message}</p>
      <Button
        onClick={onRetry}
        className="mt-2 rounded bg-black transition px-5 py-2 text-white"
      >
        Retry
      </Button>
    </div>
  );
}

export default NetworkErrorFallback;
