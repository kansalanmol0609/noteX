import dynamic from "next/dynamic";

export const CreateNoteModal = dynamic(() => import("./CreateNoteModal"), {
  ssr: false,
});
