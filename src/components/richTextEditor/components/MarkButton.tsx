import { useSlate } from 'slate-react'
import { IconType } from 'react-icons'
import { isMarkActive } from '../utils/isMarkActive'
import { toggleMark } from '../utils/toggleMark'
import { ELEMENT_TYPES } from '../types'

export const MarkButton = ({
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
                    isMarkActive(editor, format) ? 'btn-active' : ''
                }`}
                onMouseDown={(event) => {
                    event.preventDefault()
                    toggleMark(editor, format)
                }}
                aria-label={format}
            />
        </div>
    )
}
