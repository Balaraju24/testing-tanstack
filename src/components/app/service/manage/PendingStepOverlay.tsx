import { PendingStepOverlayProps } from "@/lib/interfaces/getcasefiles";
import { LockIcon } from "lucide-react";

const PendingStepOverlay: React.FC<PendingStepOverlayProps> = ({ title }) => {
  return (
    <div className="h-full bg-transparent relative">
      <div className="h-full bg-gray-200 absolute w-full top-0 opacity-40 z-10"></div>
      <div className="flex justify-center items-center h-[calc(100%-60px)] z-20 relative py-2 px-2">
        <div className="p-6 border border-gray-300 bg-white space-y-2 shadow-xl w-4/6">
          <div className="font-normal flex gap-2 text-base items-center justify-center w-full ">
            <div className="flex ">
              <LockIcon className="w-5 h-5 " />
            </div>
            {`${title} is pending`}
          </div>
          <div className="text-sm text-gray-500">
            {`You can access this step once ${title} is completed`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingStepOverlay;
