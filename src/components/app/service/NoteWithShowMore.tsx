import { useState } from "react";
import UnOrderList from "./manage/disposal-call-component/UnOrderList";

export function NoteWithShowMore({ notes }: { notes: string }) {
  const [showMore, setShowMore] = useState(false);
  const characterLimit = 150;
  const shouldTruncate = notes.length > characterLimit;
  const displayText = showMore ? notes : notes?.slice(0, characterLimit);

  return (
    <div>
      <span className="font-normal ">Hearing Reason :</span>
      <div className="text-black text-opacity-60 my-2 mx-1">
        <span>
          <UnOrderList text={displayText} />
        </span>
        {shouldTruncate && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-black cursor-pointer text-xs font-semibold hover:underline"
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
}
