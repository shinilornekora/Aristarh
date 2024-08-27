import { Reducer, configureStore } from '@reduxjs/toolkit';
import { api } from './api';

import { Actions, ActionType, Project, StateType } from './types';

require('../aristarh');

const initialState = {
    project: {
        name: 'Unnamed',
        tree: {}
    },
    user: '',
    control: {
        activePopup: undefined,
        mouse: ''
    },
    scenarios: {
        renamingProject: false,
        supportPopupShow: false,
    }
}

// TODO: перенести метод в utils и создать вообще такой файл - цель, сбор хелперов
async function exportProjectScheme({ name, tree }: Project) {
    // Сервер еще должен записать это в журнал действий пользователя
    const { link } = await api.project.export({ name, tree })
    
    if (!link) {
        Aristarh.voice('[exporter]: Project cannot be exported, no download link from server.');
        return;
    }
    
    const fakeElement = document.createElement('a');
    fakeElement.download = link;
    fakeElement.click();
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
        
        default:
            return state;
    }
}

export const store = configureStore({
    reducer: dispatcher,
});