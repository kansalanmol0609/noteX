import { memo } from 'react'
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
    MdInsertLink,
    MdLinkOff,
} from 'react-icons/md'
import { MarkButton } from '../MarkButton'
import { BlockButton } from '../BlockButton'
import { ELEMENT_TYPES } from '../../types'

const Toolbar = () => {
    return (
        <div className="flex flex-row justify-start items-center gap-2 border-b input-bordered p-2 flex-wrap">
            <MarkButton format={ELEMENT_TYPES.bold} icon={MdFormatBold} />
            <MarkButton format={ELEMENT_TYPES.italic} icon={MdFormatItalic} />
            <MarkButton
                format={ELEMENT_TYPES.underline}
                icon={MdFormatUnderlined}
            />
            <MarkButton format={ELEMENT_TYPES.code} icon={MdCode} />
            <BlockButton format={ELEMENT_TYPES.link} icon={MdInsertLink} />
            <BlockButton
                format={ELEMENT_TYPES['remove-link']}
                icon={MdLinkOff}
            />
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

export default memo(Toolbar)
