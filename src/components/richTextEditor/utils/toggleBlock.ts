import {
    Editor,
    Transforms,
    Element as SlateElement,
    Range,
    Descendant,
} from 'slate'
import { ELEMENT_TYPES, Element as ElementType, EditorProps } from '../types'
import { LIST_TYPES } from '../constants'
import { isBlockActive } from './isBlockActive'
import { insertImage } from './image'

const isLinkActive = (editor: EditorProps) => {
    //@ts-ignore
    const [link] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            //@ts-ignore
            n.type === 'link',
    })
    return !!link
}

type LinkElement = { type: 'link'; url: string; children: Descendant[] }

const unwrapLink = (editor: EditorProps) => {
    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            //@ts-ignore
            n.type === 'link',
    })
}

const wrapLink = (editor: EditorProps, url: string) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link: LinkElement = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}

const insertLink = (editor: EditorProps, url: string) => {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}

export const toggleBlock = (editor: EditorProps, format: ELEMENT_TYPES) => {
    if (format === ELEMENT_TYPES.image) {
        const url = prompt('Enter an Image URL')

        if (!url) return

        return insertImage(editor, url)
    }

    if (format === ELEMENT_TYPES.link) {
        const url = window.prompt('Enter the URL of the link:')
        if (!url) return

        return insertLink(editor, url)
    }

    if (format === ELEMENT_TYPES['remove-link']) {
        if (isLinkActive(editor)) {
            unwrapLink(editor)
        }

        return
    }

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
