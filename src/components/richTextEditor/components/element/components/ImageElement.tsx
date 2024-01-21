/* eslint-disable @next/next/no-img-element */
import { Editor, Transforms } from 'slate'
import {
    ReactEditor,
    RenderElementProps,
    useFocused,
    useSelected,
    useSlateStatic,
} from 'slate-react'

import { MdDelete } from 'react-icons/md'

import { ELEMENT_TYPES, Element, ImageElementType } from '../../../types'

const ImageElement = (props: RenderElementProps) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor as ReactEditor, props.element)

    const selected = useSelected()
    const focused = useFocused()

    return (
        <div
            {...props.attributes}
            className={`group relative flex max-w-lg flex-col my-2 border-2 ${
                selected ? 'border-red-400' : 'border-transparent'
            }`}
        >
            {props.children}
            <div contentEditable={false} className="relative">
                <img
                    src={(props.element as ImageElementType).url}
                    className="block max-w-full max-h-80"
                    alt="image"
                />

                <div
                    data-tip="delete"
                    className={`tooltip ${
                        selected && focused ? 'inline' : 'none'
                    } absolute top-1 left-1`}
                >
                    <MdDelete
                        className="text-3xl text-black btn-ghost btn-active rounded-full hover:cursor-pointer bg-white"
                        onMouseDown={(event) => {
                            event.preventDefault()

                            const paragraph: Element = {
                                type: ELEMENT_TYPES.paragraph,
                                children: [{ text: '' }],
                            }

                            Transforms.insertNodes(editor, paragraph, {
                                at: [editor.children.length],
                            })

                            Transforms.removeNodes(editor, { at: path })
                        }}
                        aria-label="delete"
                    />
                </div>
            </div>
        </div>
    )
}

export default ImageElement
