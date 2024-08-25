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
}

export interface Node {
    name?: string;
    component?: JSX.Element;
    children?: Node[];
}

export interface ActionType {
    type: Actions;
    payload: Payload;
};

export type ImageEvent = { currentTarget: HTMLImageElement };

export interface Payload {
    name?: string;
    cords?: Record<Line, number>
    nodes?: Node[];
    path?: string[];
    popup?: 'common' | 'server';
}

export interface StateType {
    project: {
        name: string;
        tree: Node;
    }
    user: string;
    control: {
        activePopup?: DropdownsType;
    }
    scenarios: {
        renamingProject: boolean; 
    }
}