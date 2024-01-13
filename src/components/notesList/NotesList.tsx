import { memo } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { FaNoteSticky } from "react-icons/fa6";

const NotesList = (): JSX.Element => {
  const [notes, setNotes] = useLocalStorage("notes", []);

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 text-gray-400">
        <FaNoteSticky className="text-6xl" />
        <div>Notes you add appear here</div>
      </div>
    );
  }

  return (
    <div>
      {notes.map((note: string, index: number) => {
        return (
          <div key={index}>
            <div>{note}</div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(NotesList);
