import {
    MdCode,
    MdFormatBold,
    MdFormatItalic,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdFormatQuote,
    MdFormatUnderlined,
    MdLooksOne,
    MdLooksTwo,
} from 'react-icons/md'
import { MarkButton } from './MarkButton'
import { BlockButton } from './BlockButton'
import { ELEMENT_TYPES } from '../types'

export const Toolbar = () => {
    return (
        <div className="flex flex-row justify-start items-center gap-2 border-b input-bordered p-2 flex-wrap">
            <MarkButton format={ELEMENT_TYPES.bold} icon={MdFormatBold} />
            <MarkButton format={ELEMENT_TYPES.italic} icon={MdFormatItalic} />
            <MarkButton
                format={ELEMENT_TYPES.underline}
                icon={MdFormatUnderlined}
            />
            <MarkButton format={ELEMENT_TYPES.code} icon={MdCode} />
            <BlockButton
                format={ELEMENT_TYPES['heading-one']}
                icon={MdLooksOne}
            />
            <BlockButton
                format={ELEMENT_TYPES['heading-two']}
                icon={MdLooksTwo}
            />
            <BlockButton
                format={ELEMENT_TYPES['block-quote']}
                icon={MdFormatQuote}
            />
            <BlockButton
                format={ELEMENT_TYPES['numbered-list']}
                icon={MdFormatListNumbered}
            />
            <BlockButton
                format={ELEMENT_TYPES['bulleted-list']}
                icon={MdFormatListBulleted}
            />
        </div>
    )
}
