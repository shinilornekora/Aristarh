export type DropdownsType = 'common' | 'server' | 'cursor' | 'page' | 'widget' | 'preview' | 'help' | undefined;

export type Line = 'x' | 'y';

export enum Actions {
    CREATE_PROJECT = 'create-project',
    RENAME_PROJECT = 'rename-project',
    ADD_TO_TREE = 'add-to-tree',
    REMOVE_FROM_TREE = 'remove-from-tree',
    CHANGE_CORDS = 'change-cords',
    SET_VISIBLE_MENU_POPUP = 'set-visible-popup',
    START_RENAMING_POPUP_SCENARIO = 'start-renaming-popup-scenario',
    END_RENAMING_POPUP_SCENARIO = 'end-renaming-popup-scenario',
    START_SUPPORT_POPUP_SCENARIO = 'start-support-popup-scenario',
    END_SUPPORT_POPUP_SCENARIO = 'end-support-popup-scenario',
    START_PREVIEW_SCENARIO = 'start-preview-scenario',
    END_PREVIEW_SCENARIO = 'end-preview-scenario',
    START_IMPORT_SCENARIO = 'start-import-scenario',
    END_IMPORT_SCENARIO = 'end-import-scenario',
    START_EXPORT_SCENARIO = 'start-export-scenario',
    END_EXPORT_SCENARIO = 'end-export-scenario',
    START_EXPORT_PROJECT_SCENARIO = 'start-export-project-scenario',
    CHANGE_MOUSE_STATE = 'change-mouse-state',
    OPEN_RIGHT_COLUMN = 'open-right-column',
    CLOSE_RIGHT_COLUMN = 'close-right-column',
    OPEN_LEFT_COLUMN = 'open-left-column',
    CLOSE_LEFT_COLUMN = 'close-left-column',
    OPEN_PAGE_SETTINGS = 'open-page-settins',
    OPEN_SERVER_SETTINGS = 'open-server-settings',
    SET_PROJECT_GLOBALLY = 'set-project-globally'
}

export interface NodeDataType {
    name?: string;
    component?: JSX.Element;
    children?: Node;
}

// @ts-expect-error: так и надо, это рекурсивный тип
export type Node = Record<string, Node>

export interface ActionType {
    type: Actions;
    payload: Payload;
};

export type ImageEvent = { currentTarget: HTMLImageElement };

export interface Payload extends Project {
    cords?: Record<Line, number>
    path?: string[];
    popup?: 'common' | 'server';
    children?: Node;
}

export type Project = {
    name: string;
    tree: Node;
}

export interface StateType {
    project: Project;
    user: string;
    control: {
        activePopup?: DropdownsType;
    }
    scenarios: {
        renamingProject: boolean; 
<<<<<<< HEAD
        supportPopupShow: boolean;
=======
        supportPopupShow: boolean,
        showRightColumn: boolean,
        showLeftColumn: boolean,
>>>>>>> 9efc810 ([ADD] Left column folder and actions in the store)
    }
}