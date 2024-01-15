import { ELEMENT_TYPES, Node } from './types'

export const EmptyDocument: Array<Node> = [
    {
        type: ELEMENT_TYPES.paragraph,
        children: [
            {
                text: '',
            },
        ],
    },
]

export const LIST_TYPES = ['numbered-list', 'bulleted-list']
