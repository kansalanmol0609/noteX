import { DeleteNoteModal } from "@/components/deleteNoteModal";
import { EditNoteModal } from "@/components/editNoteModal";
import { ComponentProps, SyntheticEvent } from "react";

export enum ACTION_TYPES {
  EDIT = "EDIT",
  DELETE = "DELETE",
}

export enum OVERLAY_TYPES {
  EDIT_NOTE = "EDIT_NOTE",
  DELETE_NOTE = "DELETE_NOTE",
}

export type OverlayState =
  | undefined
  | {
      type: OVERLAY_TYPES.DELETE_NOTE;
      props: ComponentProps<typeof DeleteNoteModal>;
    }
  | {
      type: OVERLAY_TYPES.EDIT_NOTE;
      props: ComponentProps<typeof EditNoteModal>;
    };

export type ActionsHandler = {
  [key in ACTION_TYPES]: (event: SyntheticEvent) => void;
};
