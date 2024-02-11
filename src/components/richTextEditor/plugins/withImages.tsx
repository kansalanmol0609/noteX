import { Editor, Transforms, BaseEditor } from 'slate'
import imageExtensions from 'image-extensions'
import { ReactEditor } from 'slate-react'
import isUrl from 'is-url'

import {
    ImageElementType,
    Element as ElementType,
    ELEMENT_TYPES,
    ParagraphElementType,
} from '../types'

const withImages = (editor: ReactEditor) => {
    const { insertData, isVoid } = editor

    editor.isVoid = ((element: ElementType) => {
        return element.type === 'image' ? true : isVoid(element)
    }) as BaseEditor['isVoid']

    editor.insertData = ((data) => {
        const text = data.getData('text/plain')
        const { files } = data

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split('/')

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result
                        insertImage(editor, url as string)
                    })

                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text)
        } else {
            insertData(data)
        }
    }) as ReactEditor['insertData']

    return editor
}

const insertImage = (editor: Editor, url: string) => {
    const paragraphNode: ParagraphElementType = {
        type: ELEMENT_TYPES.paragraph,
        children: [{ text: '' }],
    }

    const imageNode: ImageElementType = {
        type: ELEMENT_TYPES.image,
        url,
        children: [{ text: '' }],
    }

    Transforms.insertNodes(editor, [imageNode, paragraphNode])
}

const isImageUrl = (url: string | null): boolean => {
    if (!url) return false
    if (!isUrl(url)) return false

    const ext = new URL(url).pathname.split('.').pop()

    return imageExtensions.includes(ext ?? '')
}

export default withImages
