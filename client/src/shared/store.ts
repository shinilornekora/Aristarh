import { Reducer, configureStore } from '@reduxjs/toolkit';
import { Actions, ActionType, StateType } from './types';

require('../aristarh');

const initialState = {
    project: {
        name: 'Unnamed',
        tree: {}
    },
    user: '',
    control: {
        activePopup: undefined,
    },
    scenarios: {
        renamingProject: false,
    }
}

// TODO: если все таки понравится Effector, то перейти на его рельсы - иначе распилить тут все на комбайнеры
const dispatcher: Reducer<StateType, ActionType> = (state = initialState, action) => {
    const { type, payload } = action;

    if (Aristarh.DEBUG === 'log') {
        console.log(`[dispatcher]: triggered ${action.type}, payload:`, action.payload);
    }

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
        case Actions.START_RENAMING_POPUP_SCENARIO: {
            return {
                ...state,
                scenarios: {
                    ...state.scenarios,
                    renamingProject: true,
                }
            }
        }
        case Actions.END_RENAMING_POPUP_SCENARIO: {
            return {
                ...state,
                scenarios: {
                    ...state.scenarios,
                    renamingProject: false,
                }
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