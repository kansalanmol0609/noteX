import { memo } from "react";
import { FaNoteSticky } from "react-icons/fa6";
import { useNotes } from "@/hooks/useNotes";
import type { Note } from "@/types/notes";

const NotesList = (): JSX.Element => {
  const { notes } = useNotes();

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 text-gray-400">
        <FaNoteSticky className="text-6xl" />
        <div>Notes you add appear here</div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4 w-full flex-wrap place-content-start">
      {notes.map((note: Note) => {
        return (
          <div
            key={note.id}
            className="h-60 w-60 rounded-md p-4 flex flex-col gap-2 shadow-xl bg-neutral"
          >
            <div className="text-gray-200 text-lg font-medium">
              {note.title}
            </div>
            <div className="text-gray-400 overflow-hidden text-ellipsis">
              {note.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(NotesList);
