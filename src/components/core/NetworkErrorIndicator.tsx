import { useEffect, useState } from "react";
import { toast } from "sonner";
import OfflineIllustration from "../icons/network-error-indicator";
import { Button } from "../ui/button";

export default function NetworkStatusIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  const handleRetry = () => {
    if (navigator.onLine) {
      setIsOnline(true);
    } else {
      toast.error("Still offline. Check your connection.", {
        action: {
          label: "✕",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  useEffect(() => {
    const onlineStatus = navigator.onLine;
    setIsOnline(onlineStatus);
    setHasMounted(true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!hasMounted || isOnline) return null;

  return (
    !isOnline && (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center text-center px-4 z-9999">
        <OfflineIllustration />
        <h1 className="text-2xl font-semibold mb-2 text-gray-900">
          Connect to the internet
        </h1>
        <p className="text-gray-600 mb-6">
          You're offline. Check your connection.
        </p>
        <Button
          onClick={handleRetry}
          className="px-6 py-2 bg-black hover:bg-black text-white font-medium rounded transition-colors"
        >
          Retry
        </Button>
      </div>
    )
  );
}
