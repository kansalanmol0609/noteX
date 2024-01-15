import { Editor } from 'slate'
import { ELEMENT_TYPES, EditorProps } from '../types'

export const isMarkActive = (editor: EditorProps, format: ELEMENT_TYPES) => {
    const marks = Editor.marks(editor)
    // @ts-ignore
    return marks ? marks[format] === true : false
}
