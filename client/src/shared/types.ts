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
    OPEN_PAGE_SETTINGS = 'open-page-settins',
    OPEN_SERVER_SETTINGS = 'open-server-settings'
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
    }
}

// API part

export type BaseRequest<P, R> = (params: P) => Promise<R>;

export type ProjectSettings = {
    name: string;
    tree: Node;
};

export interface ProjectApi {
    export: BaseRequest<Record<string, unknown>, { project: ProjectSettings }>;
    import: BaseRequest<ProjectSettings, Record<string, unknown>>;
}

export interface Api {
    project: ProjectApi,
}

export type ApiEntity = keyof Api;

export type ApiHandler = keyof Api[ApiEntity];

export type ApiHandlerReturnType = Api[ApiEntity][ApiHandler]

export interface ProjectApiBase {
    export: string;
    import: string;
}

export interface ApiBaseType {
    project: ProjectApiBase
}

export type ApiBaseEntity = keyof ApiBaseType;

export type ApiBaseHandler = keyof ApiBaseType[ApiBaseEntity];