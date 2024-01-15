import { ReactEditor } from 'slate-react'
import { Editor, Transforms, Element as SlateElement } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ELEMENT_TYPES, Element as ElementType } from './types'

type EditorProps = Editor | ReactEditor | HistoryEditor

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const isBlockActive = (editor: EditorProps, format: ELEMENT_TYPES) => {
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

export const isMarkActive = (editor: EditorProps, format: ELEMENT_TYPES) => {
    const marks = Editor.marks(editor)
    // @ts-ignore
    return marks ? marks[format] === true : false
}

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

export const toggleMark = (editor: EditorProps, format: ELEMENT_TYPES) => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}
