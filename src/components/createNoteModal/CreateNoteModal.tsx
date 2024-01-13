import { useNotes } from "@/hooks/useNotes";
import { useState, memo, useEffect, useCallback, SyntheticEvent } from "react";
import useKeyPressEvent from "react-use/lib/useKeyPressEvent";
import _castArray from "lodash/castArray";

const CREATE_NOTE_MODAL_ID = "create-note-modal";

const CreateNoteModal = ({
  hideModal,
}: {
  hideModal: () => void;
}): JSX.Element => {
  const { addNote } = useNotes();

  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      addNote({
        title: noteTitle,
        content: _castArray(noteContent),
        createdAt: new Date().getTime(),
        id: crypto.randomUUID(),
      });

      hideModal();
    },
    [addNote, hideModal, noteContent, noteTitle]
  );

  useKeyPressEvent("Escape", hideModal);

  useEffect(() => {
    const modalElement = document.getElementById(
      CREATE_NOTE_MODAL_ID
    ) as HTMLDialogElement;

    modalElement?.showModal();
  }, []);

  return (
    <dialog id={CREATE_NOTE_MODAL_ID} className="modal">
      <div className="modal-box w-10/12 h-2/4 max-w-5xl">
        <div className="flex flex-col h-full">
          <h3 className="font-bold text-lg">Create Note</h3>
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
                <textarea
                  placeholder="Take a note..."
                  className="textarea textarea-bordered textarea-md w-full"
                  value={noteContent}
                  rows={5}
                  onChange={(e) => setNoteContent(e.target.value)}
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
        htmlFor={CREATE_NOTE_MODAL_ID}
        onClick={hideModal}
      />
    </dialog>
  );
};

export default memo(CreateNoteModal);
