import { memo } from "react";
import ReactQuill, { Quill } from "react-quill";
//@ts-ignore
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";

const QUILL_MODULES = {
	toolbar: [
		[{ header: [1, 2, false] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image"],
		["clean"],
	],
	imageResize: {
		parchment: Quill.import("parchment"),
		modules: ["Resize", "DisplaySize"],
	},
};

const QUILL_FORMATS = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
];

Quill.register("modules/imageResize", ImageResize);

const RichTextEditor = ({
	value,
	handleValueChange,
}: {
	value: string;
	handleValueChange: (value: string) => void;
}): JSX.Element => {
	return (
		<ReactQuill
			modules={QUILL_MODULES}
			formats={QUILL_FORMATS}
			value={value}
			onChange={handleValueChange}
			placeholder='Add Note...'
		/>
	);
};

export default memo(RichTextEditor);
