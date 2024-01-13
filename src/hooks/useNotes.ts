import { useCallback } from "react";
import useLocalStorage from "react-use/lib/useLocalStorage";
import type { Note } from "@/types/notes";

export const useNotes = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);

  const addNote = useCallback(
    (note: Note) => setNotes((prevNotes) => [...prevNotes!, note]),
    [setNotes]
  );

  const deleteNote = useCallback(
    (id: string) =>
      setNotes((prevNotes) => prevNotes!.filter((note) => note.id !== id)),
    [setNotes]
  );

  const editNote = useCallback(
    (nextNote: Note) =>
      setNotes((prevNotes) =>
        prevNotes!.map((prevNote) =>
          prevNote.id === nextNote.id ? nextNote : prevNote
        )
      ),
    [setNotes]
  );

  return { notes: notes!, addNote, deleteNote, editNote };
};
