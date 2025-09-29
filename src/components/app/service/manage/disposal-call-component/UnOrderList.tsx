import { NotesListProps } from "@/lib/interfaces/getcasefiles";

export default function UnOrderList({ text }: NotesListProps) {
  if (!text) return null;

  return (
    <ul className="text-black text-opacity-60 space-y-1">
      {text
        .split("\n")
        .filter((note) => note.trim() !== "")
        .map((note, index) => (
          <li
            key={index}
            className="text-black text-opacity-60 first-letter:capitalize"
          >
            {note.trim()}
          </li>
        ))}
    </ul>
  );
}
