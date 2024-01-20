// https://github.com/nareshbhatia/react-force/blob/master/packages/slate-editor/src/deserializers/deserializeFromHtml.ts
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import isHotkey, { isKeyHotkey } from 'is-hotkey'
import {
    Editable,
    withReact,
    Slate,
    ReactEditor,
    RenderElementProps as BaseRenderElementProps,
    RenderPlaceholderProps,
} from 'slate-react'
import { Editor, Transforms, createEditor, Descendant, Range } from 'slate'
import { withHistory } from 'slate-history'

import { toggleMark } from './utils/toggleMark'
import { Toolbar } from './components/toolbar'
import { Element } from './components/element'
import { Leaf } from './components/Leaf'

import withLinks from './plugins/withLinks'
import withImages from './plugins/withImages'

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

    const editor = useMemo(
        () => withImages(withLinks(withHistory(withReact(createEditor())))),
        []
    )

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
                ReactEditor.focus(editor as ReactEditor)
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

        const { selection } = editor

        // Default left/right behavior is unit:'character'.
        // This fails to distinguish between two cursor positions, such as
        // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
        // Here we modify the behavior to unit:'offset'.
        // This lets the user step into and out of the inline without stepping over characters.
        // You may wish to customize this further to only use unit:'offset' in specific cases.
        if (selection && Range.isCollapsed(selection)) {
            const { nativeEvent } = event

            if (isKeyHotkey('left', nativeEvent)) {
                event.preventDefault()
                Transforms.move(editor, { unit: 'offset', reverse: true })
                return
            }

            if (isKeyHotkey('right', nativeEvent)) {
                event.preventDefault()
                Transforms.move(editor, { unit: 'offset' })
                return
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
                editor={editor as ReactEditor}
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
