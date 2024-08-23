import { Reducer, configureStore } from '@reduxjs/toolkit';

interface Node {
    name?: string;
    component?: JSX.Element;
    children?: Node[];
}

const initialState = {
    project: {
        name: 'Unnamed',
        tree: {}
    },
    user: '',
    control: {
        activePopup: undefined,
    }
}

export enum Actions {
    CREATE_PROJECT = 'create-project',
    RENAME_PROJECT = 'rename-project',
    ADD_TO_TREE = 'add-to-tree',
    REMOVE_FROM_TREE = 'remove-from-tree',
    CHANGE_CORDS = 'change-cords',
    SET_VISIBLE_MENU_POPUP = 'set-visible-popup',
}

type Line = 'x' | 'y';

interface Payload {
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
        activePopup?: 'common' | 'server';
    }
}
interface ActionType {
    type: Actions;
    payload: Payload;
};

const dispatcher: Reducer<StateType, ActionType> = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case Actions.CREATE_PROJECT:
            return {
                ...state,
                name: payload.name
            }
        case Actions.ADD_TO_TREE:
            let nodePlace = state.project.tree;

            if (!payload.path) {
                return state;
            }

            for (const node of payload.path) {
                const currentNode = nodePlace.children?.find(child => child.name == node);

                if (!currentNode) {
                    return state;
                }
                
                nodePlace = currentNode;
            }
            
            nodePlace.children = payload.nodes
        case Actions.SET_VISIBLE_MENU_POPUP:
            return {
                ...state,
                control: {
                    ...state.control,
                    activePopup: action.payload.popup,
                }
            }
        case Actions.RENAME_PROJECT:
            if (!action.payload.name) {
                return state;
            }

            return {
                ...state,
                project: {
                    ...state.project,
                    name: action.payload.name
                }
            }
        default:
            return state;
    }
}

export const store = configureStore({
    reducer: dispatcher,
});