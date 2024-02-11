import { Editor, Element as SlateElement } from 'slate'
import { ELEMENT_TYPES, Element as ElementType } from '../types'
import { EditorProps } from '../types'

export const isBlockActive = (editor: EditorProps, format: ELEMENT_TYPES) => {
    if (format === ELEMENT_TYPES.image) {
        return false
    }

    const nodeGen = Editor.nodes(editor, {
        //@ts-ignore
        match: (n: ElementType) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === format,
    })

    let node = nodeGen.next()

    while (!node.done) {
        return true
    }

    return false
}
