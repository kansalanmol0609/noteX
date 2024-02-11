import { Editor, Transforms, Path, Node } from 'slate'
import { ReactEditor } from 'slate-react'
import { EditorProps } from '../types'

export const createImageNode = (alt: string, src: string) => [
    {
        type: 'image',
        alt,
        url: src,
        children: [{ text: '' }],
    },
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
]

export const insertImage = (editor: EditorProps, url: string) => {
    const { selection } = editor
    const imageNode = createImageNode('Image', url)

    ReactEditor.focus(editor as ReactEditor)

    if (!!selection) {
        const [parentNode, parentPath] = Editor.parent(
            editor,
            selection.focus?.path
        )

        if (editor.isVoid(parentNode) || Node.string(parentNode).length) {
            // Insert the new imageNode node after the void node or a node with content
            Transforms.insertNodes(editor, imageNode, {
                at: Path.next(parentPath),
                select: true,
            })
        } else {
            // If the node is empty, replace it instead
            Transforms.removeNodes(editor, { at: parentPath })
            Transforms.insertNodes(editor, imageNode, {
                at: parentPath,
                select: true,
            })
        }
    } else {
        // Insert the new imageNode node at the bottom of the Editor when selection
        // is falsy
        Transforms.insertNodes(editor, imageNode, { select: true })
    }
}
