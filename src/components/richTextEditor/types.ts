import {
    RenderElementProps as BaseRenderElementProps,
    RenderLeafProps as BaseRenderLeafProps,
} from 'slate-react'

export enum ELEMENT_TYPES {
    'block-quote' = 'block-quote',
    'bulleted-list' = 'bulleted-list',
    'heading-one' = 'heading-one',
    'heading-two' = 'heading-two',
    'list-item' = 'list-item',
    'numbered-list' = 'numbered-list',
    'paragraph' = 'paragraph',
    'bold' = 'bold',
    'italic' = 'italic',
    'underline' = 'underline',
    'code' = 'code',
}

export type Element = {
    type: ELEMENT_TYPES
    children: any
}

export type RenderElementProps = BaseRenderElementProps & {
    element: Element
}

export type RenderLeafProps = BaseRenderLeafProps & {
    leaf: {
        bold?: boolean
        code?: boolean
        italic?: boolean
        underline?: boolean
    }
}
