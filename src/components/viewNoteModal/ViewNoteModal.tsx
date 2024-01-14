import { memo, useEffect } from "react";
import useKeyPressEvent from "react-use/lib/useKeyPressEvent";
import _castArray from "lodash/castArray";
import { Note } from "@/types/notes";
import { MdCloseFullscreen } from "react-icons/md";

const VIEW_NOTE_MODAL_ID = "view-note-modal";

const ViewNoteModal = ({
  hideModal,
  note,
}: {
  hideModal: () => void;
  note: Note;
}): JSX.Element => {
  useKeyPressEvent("Escape", hideModal);

  useEffect(() => {
    const modalElement = document.getElementById(
      VIEW_NOTE_MODAL_ID
    ) as HTMLDialogElement;

    modalElement?.showModal();
  }, []);

  return (
    <dialog id={VIEW_NOTE_MODAL_ID} className="modal">
      <div className="modal-box w-10/12 max-w-5xl">
        <div className="flex flex-col h-full relative py-2">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">{note.title}</h3>

            <div className="tooltip" data-tip="Collapse">
              <MdCloseFullscreen
                className="text-4xl p-2 btn-ghost rounded-full hover:cursor-pointer"
                onClick={hideModal}
              />
            </div>
          </div>
          <div className="text-gray-400 overflow-hidden text-ellipsis mt-4">
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          </div>
        </div>
      </div>

      <label
        className="modal-backdrop"
        htmlFor={VIEW_NOTE_MODAL_ID}
        onClick={hideModal}
      />
    </dialog>
  );
};

export default memo(ViewNoteModal);
