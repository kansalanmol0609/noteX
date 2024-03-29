import { useCallback } from 'react'
import useToggle from 'react-use/lib/useToggle'
import { NotesList } from '@/components/notesList'
import { Inter } from 'next/font/google'
import { CreateNoteModal } from '@/components/createNoteModal'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [showCreateNoteModal, toggleShowCreateNoteModal] = useToggle(false)

    const hideModal = useCallback(
        () => toggleShowCreateNoteModal(false),
        [toggleShowCreateNoteModal]
    )

    return (
        <main
            className={`flex max-w-full min-h-screen flex-col items-center gap-16 justify-start p-24 ${inter.className}`}
        >
            <input
                type="text"
                placeholder="Take a note..."
                value=""
                className="input input-bordered w-full max-w-2xl"
                onClick={() => toggleShowCreateNoteModal(true)}
                onChange={() => toggleShowCreateNoteModal(true)}
            />
            {showCreateNoteModal ? (
                <CreateNoteModal hideModal={hideModal} />
            ) : null}

            <NotesList />
        </main>
    )
}
