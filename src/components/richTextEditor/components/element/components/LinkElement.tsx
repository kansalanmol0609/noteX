import { useSelected } from 'slate-react'
import { RenderElementProps } from '../../../types'

export function LinkElement({
    attributes,
    children,
    element,
}: RenderElementProps) {
    const selected = useSelected()

    return (
        <a
            {...attributes}
            className={`link link-primary ${
                selected ? 'border border-gray-50' : ''
            }}`}
            target="_blank"
            href={element.url}
        >
            {children}
        </a>
    )
}
