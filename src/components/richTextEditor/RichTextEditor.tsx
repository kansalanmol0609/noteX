// https://github.com/nareshbhatia/react-force/blob/master/packages/slate-editor/src/deserializers/deserializeFromHtml.ts
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import isHotkey from 'is-hotkey'
import {
    Editable,
    withReact,
    Slate,
    ReactEditor,
    RenderElementProps as BaseRenderElementProps,
    RenderPlaceholderProps,
} from 'slate-react'
import { Editor, Transforms, createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'

import { toggleMark } from './utils'
import { Toolbar } from './components/Toolbar'
import { Element } from './components/Element'
import { Leaf } from './components/Leaf'

import { ELEMENT_TYPES, RenderElementProps, RenderLeafProps } from './types'

// @refresh reset
const HOTKEYS: { [hotkey: string]: ELEMENT_TYPES } = {
    'mod+b': ELEMENT_TYPES.bold,
    'mod+i': ELEMENT_TYPES.italic,
    'mod+u': ELEMENT_TYPES.underline,
    'mod+`': ELEMENT_TYPES.code,
}

const DEFAULT_INITIAL_VALUE = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
] as unknown as Descendant[]

const RichTextEditor = ({
    initialValue = DEFAULT_INITIAL_VALUE,
    handleValueChange,
}: {
    initialValue?: Descendant[]
    handleValueChange: (value: Descendant[]) => void
}) => {
    const renderElement = useCallback(
        (props: RenderElementProps) => <Element {...props} />,
        []
    )

    const renderLeaf = useCallback(
        (props: RenderLeafProps) => <Leaf {...props} />,
        []
    )

    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    //focus selection
    const [focused, setFocused] = useState(false)
    const savedSelection = useRef(editor.selection)

    const onFocus = useCallback(() => {
        setFocused(true)

        if (!editor.selection) {
            Transforms.select(
                editor,
                savedSelection.current ?? Editor.end(editor, [])
            )
        }
    }, [editor])

    const onBlur = useCallback(() => {
        setFocused(false)
        savedSelection.current = editor.selection
    }, [editor])

    const divRef = useRef<HTMLDivElement>(null)

    const focusEditor = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === divRef.current) {
                ReactEditor.focus(editor)
                e.preventDefault()
            }
        },
        [editor]
    )

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
            }
        }
    }

    const renderPlaceholder = useCallback(
        ({ children, attributes }: RenderPlaceholderProps) => {
            return (
                <div {...attributes} className="mt-5">
                    {children}
                </div>
            )
        },
        []
    )

    return (
        <div
            ref={divRef}
            onMouseDown={focusEditor}
            className="input-bordered border rounded-lg max-h-96 relative"
            style={
                focused
                    ? {
                          outline:
                              '1px solid var(--fallback-bc, oklch(var(--bc) / 0.2))',
                          outlineOffset: '2px',
                      }
                    : {}
            }
        >
            <Slate
                editor={editor}
                initialValue={initialValue}
                onChange={handleValueChange}
            >
                <Toolbar />

                <Editable
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    renderElement={
                        renderElement as (
                            props: BaseRenderElementProps
                        ) => JSX.Element
                    }
                    renderLeaf={renderLeaf}
                    placeholder="Add Note..."
                    renderPlaceholder={renderPlaceholder}
                    style={{
                        height: '150px',
                        overflow: 'auto',
                        padding: '1.2rem',
                        outlineWidth: '0px',
                    }}
                />
            </Slate>
        </div>
    )
}

export default memo(RichTextEditor)
