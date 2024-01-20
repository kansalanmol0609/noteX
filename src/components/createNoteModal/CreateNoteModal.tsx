import { useNotes } from '@/hooks/useNotes'
import { useState, memo, useEffect, useCallback, SyntheticEvent } from 'react'
import useKeyPressEvent from 'react-use/lib/useKeyPressEvent'
import _castArray from 'lodash/castArray'
import { RichTextEditor } from '../richTextEditor'
import { Note } from '@/types/notes'

const CREATE_NOTE_MODAL_ID = 'create-note-modal'

const CreateNoteModal = ({
    hideModal,
}: {
    hideModal: () => void
}): JSX.Element => {
    const { addNote } = useNotes()

    const [noteContent, setNoteContent] = useState<Note['content'] | undefined>(
        undefined
    )
    const [noteTitle, setNoteTitle] = useState('')

    const handleSubmit = useCallback(
        (event: SyntheticEvent) => {
            event.preventDefault()

            if (noteContent) {
                addNote({
                    title: noteTitle,
                    content: noteContent,
                    createdAt: new Date().getTime(),
                    id: crypto.randomUUID(),
                })
            }

            hideModal()
        },
        [addNote, hideModal, noteContent, noteTitle]
    )

    useKeyPressEvent('Escape', hideModal)

    useEffect(() => {
        const modalElement = document.getElementById(
            CREATE_NOTE_MODAL_ID
        ) as HTMLDialogElement

        modalElement?.showModal()
    }, [])

    return (
        <dialog id={CREATE_NOTE_MODAL_ID} className="modal">
            <div className="modal-box w-full max-w-5xl">
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
                                    className="input input-bordered w-full"
                                    value={noteTitle}
                                    placeholder="Title"
                                    onChange={(e) =>
                                        setNoteTitle(e.target.value)
                                    }
                                />
                                <RichTextEditor
                                    initialValue={noteContent}
                                    handleValueChange={(
                                        nextValue: Note['content']
                                    ) => setNoteContent(nextValue)}
                                />
                            </div>
                            <div className="flex flex-row gap-4 justify-end">
                                <button
                                    className="btn btn-primary btn-sm"
                                    type="submit"
                                >
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
    )
}

export default memo(CreateNoteModal)
