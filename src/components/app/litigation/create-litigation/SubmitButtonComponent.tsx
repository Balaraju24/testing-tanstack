import { Button } from "@/components/ui/button";
import { SubmitButtonProps } from "@/lib/interfaces/litigation";
import { Loader2 } from "lucide-react";

export const SubmitButtonComponent = ({
  canSubmit,
  isPending,
  onSubmit,
}: SubmitButtonProps) => {
  return (
    <div className="flex justify-end max-w-2xl mx-auto">
      <Button
        className="px-6 py-2 bg-black text-white cursor-pointer rounded-none hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!canSubmit || isPending}
        onClick={onSubmit}
      >
        {isPending ? (
          <div className="flex items-center">
            Submitting... <Loader2 className="animate-spin h-4 w-4 ml-2" />
          </div>
        ) : (
          "Submit"
        )}
      </Button>
    </div>
  );
};
