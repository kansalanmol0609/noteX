import { Editor } from 'slate'
import { ELEMENT_TYPES, EditorProps } from '../types'
import { isMarkActive } from './isMarkActive'

export const toggleMark = (editor: EditorProps, format: ELEMENT_TYPES) => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}
