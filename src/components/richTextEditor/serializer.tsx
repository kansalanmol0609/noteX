// https://github.com/nareshbhatia/react-force/blob/master/packages/slate-editor/src/serializers/serializeToHtml.ts

import escapeHtml from 'escape-html'
import { Text } from 'slate'
import { Node, ELEMENT_TYPES } from './types'

// Recursive function - recurses on children
const serialize = (node: Node): string => {
    // if text node, stop recursion
    if (Text.isText(node)) {
        let html = escapeHtml(node.text)
        if (node.bold) {
            html = `<strong>${html}</strong>`
        }
        if (node.italic) {
            html = `<em>${html}</em>`
        }
        if (node.underline) {
            html = `<u>${html}</u>`
        }
        if (node.strikethrough) {
            html = `<s>${html}</s>`
        }
        if (node.code) {
            html = `<code>${html}</code>`
        }
        return html
    }

    // if void node, stop recursion
    // switch (node.type as ElementType) {
    //     case 'image': {
    //         const url = escapeHtml(node.url as string)
    //         const alt = escapeHtml(node.alt as string)
    //         return `<img src="${url}" alt="${alt}" class="rf-img" />`
    //     }
    // }

    // if non-leaf node, recurse on children and then process self
    const children = node.children.map((n: Node) => serialize(n)).join('')

    switch (node.type) {
        case ELEMENT_TYPES['block-quote']:
            return `<blockquote class="border-l-4 border-white pl-4">
                    ${children}
                </blockquote>`

        case ELEMENT_TYPES['list-item']:
            return `<li>${children}</li>`

        case ELEMENT_TYPES['numbered-list']:
            return `<ol class="!list-decimal ml-5">${children}</ol>`

        case ELEMENT_TYPES['bulleted-list']:
            return `<ul class="!list-disc ml-5">${children}</ul>`

        case ELEMENT_TYPES['heading-one']:
            return `<h1 class="text-xl font-bold my-3">${children}</h1>`

        case ELEMENT_TYPES['heading-two']:
            return `<h2 class="text-lg font-semibold my-2">${children}</h2>`

        // case 'link': {
        //     const url = escapeHtml(node.url as string)
        //     const targetStr = node.openInNewTab
        //         ? 'target="_blank" rel="noopener noreferrer"'
        //         : ''
        //     return `<a href="${url}" ${targetStr}>${children}</a>`
        // }

        case ELEMENT_TYPES['paragraph']:
            return `<p>${children}</p>`

        default:
            return children
    }
}

export const serializeToHtml = (value: Array<Node>): string =>
    serialize({
        children: value,
    })
