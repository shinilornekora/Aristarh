import { Reducer, configureStore } from '@reduxjs/toolkit';

import { Actions, ActionType, StateType } from './types';
import { exportProjectScheme, startImportScenario } from './utils';

require('../aristarh');

const initialState = {
    project: {
        name: 'Unnamed',
        tree: []
    },
    user: '',
    control: {
        activePopup: undefined,
        rightColumnActiveTab: undefined,
        targetElementId: '',
        mouse: ''
    },
    scenarios: {
        renamingProject: false,
        supportPopupShow: false,
        isLeftColumnVisible: false,
    }
}

// TODO: если все таки понравится Effector, то перейти на его рельсы - иначе распилить тут все на комбайнеры
const dispatcher: Reducer<StateType, ActionType> = (state = initialState, action) => {
    const { type, payload } = action;

    Aristarh.voice(`[dispatcher]: triggered ${action.type}, payload:`, action.payload);
    

    switch(type) {
        case Actions.CREATE_PROJECT:
            return {
                ...state,
                name: payload.name
            }
        case Actions.SET_RIGHT_COLUMN_TAB:
            return {
                ...state,
                control: {
                    ...state.control,
                    rightColumnActiveTab: action.payload.tab
                }
            }
        case Actions.SET_PROJECT_GLOBALLY:
            return {
                ...state,
                project: {
                    ...action.payload
                }
            }
        case Actions.ADD_TO_TREE:
            let nodePlace = state.project.tree;

            // Path это последовательность шагов, как добраться к ноде.
            // Если его нет, процесс даже не нужно начинать.
            if (!payload.path) {
                return state;
            }

            for (const node of payload.path) {
                const currentNode = nodePlace.children[node];

                if (!currentNode) {
                    return state;
                }
                
                nodePlace = currentNode;
            }
            
            nodePlace.children = payload.children

            return state;
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
        case Actions.START_DND_SCENARIO: {
            return {
                ...state,
                control: {
                    ...state.control,
                    targetElementId: action.payload.targetElementId,
                }
            }
        }
        case Actions.END_DND_SCENARIO: {
            dispatcher(state, {
                type: Actions.ADD_TO_TREE,
                payload: action.payload,
            });

            return {
                ...state,
                control: {
                    ...state.control,
                    targetElementId: '',
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
        case Actions.START_SUPPORT_POPUP_SCENARIO:
            return {
                ...state,
                scenarios: {
                    ...state.scenarios,
                    supportPopupShow: true,
                }
            }
        case Actions.END_SUPPORT_POPUP_SCENARIO:
            return {
                ...state,
                scenarios: {
                    ...state.scenarios,
                    supportPopupShow: false
                }
            }
        case Actions.START_EXPORT_SCENARIO:
            exportProjectScheme({ ...state.project });

            return state
        
        case Actions.START_IMPORT_SCENARIO:
            startImportScenario();

            return state
        
        case Actions.OPEN_LEFT_COLUMN:
            return {
                ...state,
                scenarios: {
                    ...state.scenarios,
                    isLeftColumnVisible: true
                }
            }
        default:
            return state;
    }
}

export const store = configureStore({
    reducer: dispatcher,
});