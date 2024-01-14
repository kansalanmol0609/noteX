import { useNotes } from "@/hooks/useNotes";
import { useState, memo, useEffect, useCallback, SyntheticEvent } from "react";
import useKeyPressEvent from "react-use/lib/useKeyPressEvent";
import _castArray from "lodash/castArray";
import { Note } from "@/types/notes";
import { RichTextEditor } from "../richTextEditor";

const EDIT_NOTE_MODAL_ID = "edit-note-modal";

const EditNoteModal = ({
  hideModal,
  note,
}: {
  hideModal: () => void;
  note: Note;
}): JSX.Element => {
  const { editNote } = useNotes();

  const [noteContent, setNoteContent] = useState(note.content);
  const [noteTitle, setNoteTitle] = useState(note.title);

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      editNote({
        ...note,
        title: noteTitle,
        content: noteContent,
      });

      hideModal();
    },
    [editNote, hideModal, note, noteContent, noteTitle]
  );

  useKeyPressEvent("Escape", hideModal);

  useEffect(() => {
    const modalElement = document.getElementById(
      EDIT_NOTE_MODAL_ID
    ) as HTMLDialogElement;

    modalElement?.showModal();
  }, []);

  return (
    <dialog id={EDIT_NOTE_MODAL_ID} className="modal">
      <div className="modal-box w-10/12 h-1/2 max-w-5xl">
        <div className="flex flex-col h-full">
          <h3 className="font-bold text-lg">Edit Note</h3>
          <div className="modal-action flex-1">
            <form
              method="dialog"
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-between gap-4 h-full"
            >
              <div className="w-full flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered w-full"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
                <RichTextEditor
                  value={noteContent}
                  handleValueChange={(nextValue: string) =>
                    setNoteContent(nextValue)
                  }
                />
              </div>
              <div className="flex flex-row gap-4 justify-end">
                <button className="btn btn-primary btn-sm" type="submit">
                  Save
                </button>
                <button
                  className="btn btn-outline btn-ghost btn-sm"
                  type="button"
                  onClick={hideModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <label
        className="modal-backdrop"
        htmlFor={EDIT_NOTE_MODAL_ID}
        onClick={hideModal}
      />
    </dialog>
  );
};

export default memo(EditNoteModal);
