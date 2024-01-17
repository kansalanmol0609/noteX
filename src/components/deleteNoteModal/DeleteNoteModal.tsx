import { useNotes } from '@/hooks/useNotes'
import { memo, useEffect, useCallback } from 'react'
import useKeyPressEvent from 'react-use/lib/useKeyPressEvent'
import _castArray from 'lodash/castArray'
import { Note } from '@/types/notes'

const DELETE_NOTE_MODAL_ID = 'delete-note-modal'

const DeleteNoteModal = ({
    hideModal,
    note,
}: {
    hideModal: () => void
    note: Note
}): JSX.Element => {
    const { deleteNote } = useNotes()

    const handleDeletion = useCallback(() => {
        deleteNote(note.id)

        hideModal()
    }, [deleteNote, hideModal, note.id])

    useKeyPressEvent('Escape', hideModal)

    useEffect(() => {
        const modalElement = document.getElementById(
            DELETE_NOTE_MODAL_ID
        ) as HTMLDialogElement

        modalElement?.showModal()
    }, [])

    return (
        <dialog id={DELETE_NOTE_MODAL_ID} className="modal">
            <div className="modal-box w-10/12 max-w-5xl">
                <div className="flex flex-col h-full">
                    <h3 className="font-bold text-lg">Delete Note</h3>
                    <div className="modal-action flex-1">
                        <div className="w-full flex flex-col gap-4">
                            <div className="text-gray-400 overflow-hidden text-ellipsis">
                                Are you sure you want to delete this note?
                            </div>

                            <div className="flex flex-row gap-4 justify-end">
                                <button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                    onClick={handleDeletion}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-outline btn-ghost btn-sm"
                                    type="button"
                                    onClick={hideModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <label
                className="modal-backdrop"
                htmlFor={DELETE_NOTE_MODAL_ID}
                onClick={hideModal}
            />
        </dialog>
    )
}

export default memo(DeleteNoteModal)
