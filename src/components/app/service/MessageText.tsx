import Linkify from "linkify-react";
import { Check, CheckCheck } from "lucide-react";

const MessageText = ({ message, formattedTime, userReadStatus }: any) => {
  const allSeen =
    userReadStatus?.length > 0 && userReadStatus.every((r: any) => r.is_seen);

  return (
    <div className="bg-blue-100 border-[1px] max-w-full min-w-28 relative border-zinc-300 p-2">
      <div className="text-md mb-2">
        <ul className="mb-0">
          {message.split("\n").map((line: string, index: number) => (
            <li key={index} className="break-words">
              <Linkify
                options={{
                  target: "_blank",
                  className: "text-blue-600 hover:underline",
                }}
              >
                {line.trim()}
              </Linkify>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-[10px] absolute right-1 -bottom-1">
        <div className="mt-1 flex items-center gap-1 pb-1">
          <span>{formattedTime}</span>
          {allSeen ? (
            <CheckCheck className="w-4 h-4 text-blue-500" />
          ) : (
            <Check className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageText;
