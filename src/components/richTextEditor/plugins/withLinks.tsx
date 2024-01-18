import { ReactEditor } from 'slate-react'
import { ELEMENT_TYPES, EditorProps, Element } from '../types'

const withLinks = (editor: EditorProps) => {
    const { isInline } = editor

    editor.isInline = (element) =>
        (element as unknown as Element).type === ELEMENT_TYPES.link
            ? true
            : isInline(element)

    return editor as ReactEditor
}

export default withLinks
