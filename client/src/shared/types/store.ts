import { DropdownsType, TabType } from "./ui";

export enum Actions {
    ADD_TO_TREE = 'add-to-tree',
    CHANGE_CORDS = 'change-cords',
    CREATE_PROJECT = 'create-project',
    RENAME_PROJECT = 'rename-project',
    REMOVE_FROM_TREE = 'remove-from-tree',
    START_DND_SCENARIO = 'start-dnd-scenario',
    END_DND_SCENARIO = 'end-dnd-scenario',
    SET_VISIBLE_MENU_POPUP = 'set-visible-popup',
    SET_RIGHT_COLUMN_TAB = 'set-right-column-tab',
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
    OPEN_LEFT_COLUMN = 'open-left-column',
    CLOSE_LEFT_COLUMN = 'close-left-column',
    OPEN_PAGE_SETTINGS = 'open-page-settins',
    OPEN_SERVER_SETTINGS = 'open-server-settings',
    SET_PROJECT_GLOBALLY = 'set-project-globally'
}

export interface ActionType {
    type: Actions;
    payload: Payload;
};

export type Project = {
    name: string;
    tree: Node;
}

export interface Payload extends Project {
    cords?: Record<Line, number>
    path?: string[];
    popup?: 'common' | 'server';
    children?: Node;
    targetElementId?: string;
    tab?: TabType;
}


export interface StateType {
    project: Project;
    user: string;
    control: {
        activePopup?: DropdownsType;
        rightColumnActiveTab?: TabType;
        targetElementId?: string;
    }
    scenarios: {
        renamingProject: boolean; 
        supportPopupShow: boolean;
        isLeftColumnVisible: boolean;
    }
}

export type Line = 'x' | 'y';

export interface NodeDataType {
    name?: string;
    component?: JSX.Element;
    children?: Node;
}

// @ts-expect-error: так и надо, это рекурсивный тип
export type Node = Record<string, Node>