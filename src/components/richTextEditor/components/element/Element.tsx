import { memo } from 'react'

import { LinkElement } from './components/LinkElement'
import ImageElement from './components/ImageElement'
import { RenderElementProps, ELEMENT_TYPES } from '../../types'

const Element = (props: RenderElementProps) => {
    const { attributes, children, element } = props

    switch (element.type) {
        case ELEMENT_TYPES['block-quote']:
            return (
                <blockquote
                    className="border-l-4 border-white pl-4"
                    {...attributes}
                >
                    {children}
                </blockquote>
            )

        case ELEMENT_TYPES['list-item']:
            return <li {...attributes}>{children}</li>

        case ELEMENT_TYPES['numbered-list']:
            return (
                <ol className="list-decimal ml-5" {...attributes}>
                    {children}
                </ol>
            )
        case ELEMENT_TYPES['bulleted-list']:
            return (
                <ul className="list-disc ml-5" {...attributes}>
                    {children}
                </ul>
            )

        case ELEMENT_TYPES['heading-one']:
            return (
                <h1 className="text-xl font-bold my-3" {...attributes}>
                    {children}
                </h1>
            )

        case ELEMENT_TYPES['heading-two']:
            return (
                <h2 className="text-lg font-semibold my-2" {...attributes}>
                    {children}
                </h2>
            )

        case ELEMENT_TYPES['link']:
            return <LinkElement {...props} />

        case ELEMENT_TYPES['image']:
            return <ImageElement {...props} />

        default:
            return <p {...attributes}>{children}</p>
    }
}

export default memo(Element)
