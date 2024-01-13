import dynamic from "next/dynamic";
import { Placeholder } from "./Placeholder";

const NotesList = dynamic(() => import("./NotesList"), {
  ssr: false,
  loading: () => <Placeholder />,
});

export { NotesList };
