import { memo, useCallback, useMemo, useState } from "react";
import { DeleteNoteModal } from "@/components/deleteNoteModal";
import { EditNoteModal } from "@/components/editNoteModal";
import {
  ActionsHandler,
  OverlayState,
  ACTION_TYPES,
  OVERLAY_TYPES,
} from "./types";
import type { Note } from "@/types/notes";
import { ViewNoteModal } from "@/components/viewNoteModal";

const WrapWithActionsHandler = ({
  children,
  note,
}: {
  children: (handlers: ActionsHandler) => JSX.Element;
  note: Note;
}) => {
  const [overlayState, setOverlayState] = useState<OverlayState>(undefined);

  const hideOverlay = useCallback(() => setOverlayState(undefined), []);

  const handlers = useMemo<ActionsHandler>(
    () => ({
      [ACTION_TYPES.EDIT]: () =>
        setOverlayState({
          type: OVERLAY_TYPES.EDIT_NOTE,
          props: {
            hideModal: hideOverlay,
            note,
          },
        }),

      [ACTION_TYPES.DELETE]: () =>
        setOverlayState({
          type: OVERLAY_TYPES.DELETE_NOTE,
          props: {
            hideModal: hideOverlay,
            note,
          },
        }),

      [ACTION_TYPES.VIEW]: () =>
        setOverlayState({
          type: OVERLAY_TYPES.VIEW_NOTE,
          props: {
            hideModal: hideOverlay,
            note,
          },
        }),
    }),
    [hideOverlay, note]
  );

  return (
    <>
      {children(handlers)}

      {overlayState?.type === OVERLAY_TYPES.EDIT_NOTE ? (
        <EditNoteModal {...overlayState.props} />
      ) : null}

      {overlayState?.type === OVERLAY_TYPES.DELETE_NOTE ? (
        <DeleteNoteModal {...overlayState.props} />
      ) : null}

      {overlayState?.type === OVERLAY_TYPES.VIEW_NOTE ? (
        <ViewNoteModal {...overlayState.props} />
      ) : null}
    </>
  );
};

export default memo(WrapWithActionsHandler);
