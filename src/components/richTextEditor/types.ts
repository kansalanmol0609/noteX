import {
    RenderElementProps as BaseRenderElementProps,
    RenderLeafProps as BaseRenderLeafProps,
} from 'slate-react'
import { ReactEditor } from 'slate-react'
import { Editor } from 'slate'
import { HistoryEditor } from 'slate-history'

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

export type Leaf = {
    bold?: boolean
    code?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
}

export type RenderElementProps = BaseRenderElementProps & {
    element: Element
}

export type RenderLeafProps = BaseRenderLeafProps & {
    leaf: Leaf
}

export type Node = {
    children: any
    type?: ELEMENT_TYPES
} & Leaf

export type EditorProps = Editor | ReactEditor | HistoryEditor
