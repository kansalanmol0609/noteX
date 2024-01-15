import { useSlate } from 'slate-react'
import { IconType } from 'react-icons'
import { isBlockActive, toggleBlock } from '../utils'
import { ELEMENT_TYPES } from '../types'

export const BlockButton = ({
    format,
    icon: Icon,
}: {
    format: ELEMENT_TYPES
    icon: IconType
}) => {
    const editor = useSlate()
    return (
        <div className="tooltip" data-tip={format}>
            <Icon
                className={`text-4xl p-2 btn-ghost rounded-full hover:cursor-pointer ${
                    isBlockActive(editor, format) ? 'btn-active' : ''
                }`}
                onMouseDown={(event) => {
                    event.preventDefault()

                    toggleBlock(editor, format)
                }}
                aria-label={format}
            />
        </div>
    )
}
