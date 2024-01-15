import { Editor, Transforms, Element as SlateElement } from 'slate'
import { ELEMENT_TYPES, Element as ElementType, EditorProps } from '../types'
import { LIST_TYPES } from '../constants'
import { isBlockActive } from './isBlockActive'

export const toggleBlock = (editor: EditorProps, format: ELEMENT_TYPES) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        //@ts-ignore
        match: (n: ElementType) =>
            LIST_TYPES.includes(
                (!Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n.type) as string
            ),
        split: true,
    })

    const newProperties: Partial<ElementType> = {
        type: isActive
            ? ELEMENT_TYPES.paragraph
            : isList
            ? ELEMENT_TYPES['list-item']
            : format,
    }

    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}
