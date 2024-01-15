import { Descendant } from 'slate'

export type Note = {
    id: string
    title: string
    content: Descendant[]
    createdAt: number
}
