import { DeleteNoteModal } from '@/components/deleteNoteModal'
import { EditNoteModal } from '@/components/editNoteModal'
import { ViewNoteModal } from '@/components/viewNoteModal'
import { ComponentProps, SyntheticEvent } from 'react'

export enum ACTION_TYPES {
    EDIT = 'EDIT',
    DELETE = 'DELETE',
    VIEW = 'VIEW',
}

export enum OVERLAY_TYPES {
    EDIT_NOTE = 'EDIT_NOTE',
    DELETE_NOTE = 'DELETE_NOTE',
    VIEW_NOTE = 'VIEW_NOTE',
}

export type OverlayState =
    | undefined
    | {
          type: OVERLAY_TYPES.DELETE_NOTE
          props: ComponentProps<typeof DeleteNoteModal>
      }
    | {
          type: OVERLAY_TYPES.EDIT_NOTE
          props: ComponentProps<typeof EditNoteModal>
      }
    | {
          type: OVERLAY_TYPES.VIEW_NOTE
          props: ComponentProps<typeof ViewNoteModal>
      }

export type ActionsHandler = {
    [key in ACTION_TYPES]: (event: SyntheticEvent) => void
}
