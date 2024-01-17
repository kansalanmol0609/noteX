import { memo } from 'react'
import { FaNoteSticky } from 'react-icons/fa6'

import { useNotes } from '@/hooks/useNotes'
import { NoteItem } from '@/components/noteItem'

import type { Note } from '@/types/notes'

const NotesList = (): JSX.Element => {
    const { notes } = useNotes()

    if (notes.length === 0) {
        return (
            <div className="flex flex-col items-center gap-4 text-gray-400">
                <FaNoteSticky className="text-6xl" />
                <div>Notes you add appear here</div>
            </div>
        )
    }

    return (
        <div className="flex flex-row gap-4 w-full flex-wrap place-content-start">
            {notes.map((note: Note) => {
                return <NoteItem key={note.id} note={note} />
            })}
        </div>
    )
}

export default memo(NotesList)
