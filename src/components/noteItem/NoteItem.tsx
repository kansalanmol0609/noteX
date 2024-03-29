import { memo, useMemo } from 'react'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import { CgArrowsExpandRight } from 'react-icons/cg'
import { useHover } from '@/hooks/useHover'
import { WrapWithActionsHandler } from './wrapWithActionsHandler'
import type { Note } from '@/types/notes'
import {
    ACTION_TYPES,
    type ActionsHandler,
} from './wrapWithActionsHandler/types'
import { serializeToHtml } from '@/components/richTextEditor/utils/serializer'

const NoteItem = ({ note }: { note: Note }): JSX.Element => {
    const [hoverHandlers, isHovering] = useHover()

    const htmlContent = useMemo(
        //@ts-ignore
        () => serializeToHtml(note.content),
        [note.content]
    )

    return (
        <WrapWithActionsHandler note={note}>
            {(actionsHandlers: ActionsHandler) => (
                <div
                    key={note.id}
                    className="h-80 w-60 rounded-md p-4 flex flex-col justify-between transition-shadow hover:shadow-2xl  bg-neutral"
                    {...hoverHandlers}
                >
                    <div className="h-4/5 flex flex-col gap-2">
                        <div className="text-gray-200 text-lg font-medium">
                            {note.title}
                        </div>
                        <div className="text-gray-400 overflow-hidden text-ellipsis">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: htmlContent,
                                }}
                            />
                        </div>
                    </div>
                    <div
                        className={`flex flex-row justify-between transition-opacity ${
                            isHovering ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className="flex flex-row gap-2">
                            <div className="tooltip" data-tip="Edit">
                                <MdModeEditOutline
                                    className="text-4xl p-2 btn-ghost rounded-full hover:cursor-pointer"
                                    onClick={actionsHandlers[ACTION_TYPES.EDIT]}
                                />
                            </div>

                            <div className="tooltip" data-tip="Delete">
                                <MdDelete
                                    className="text-4xl p-2 btn-ghost rounded-full hover:cursor-pointer"
                                    onClick={
                                        actionsHandlers[ACTION_TYPES.DELETE]
                                    }
                                />
                            </div>
                        </div>

                        <div className="tooltip" data-tip="Expand">
                            <CgArrowsExpandRight
                                className="text-4xl p-2 btn-ghost rounded-full hover:cursor-pointer"
                                onClick={actionsHandlers[ACTION_TYPES.VIEW]}
                            />
                        </div>
                    </div>
                </div>
            )}
        </WrapWithActionsHandler>
    )
}

export default memo(NoteItem)
