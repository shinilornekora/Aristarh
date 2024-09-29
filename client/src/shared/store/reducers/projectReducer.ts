import { Actions, ActionType, StateType } from "../../types/store";
import { exportProjectScheme, startImportScenario } from "../../utils";

export const projectReducer = (state: StateType, action: ActionType): StateType => {
    const { type, payload } = action;

    switch(type) {
        case Actions.CREATE_PROJECT:
            return {
                ...state,
                project: {
                    ...state.project,
                    name: payload.name,
                }
            };
        case Actions.SET_PROJECT_GLOBALLY:
            return {
                ...state,
                project: {
                    ...payload
                }
            };
        case Actions.RENAME_PROJECT:
            if (!payload.name) {
                return state;
            }
            return {
                ...state,
                project: {
                    ...state.project,
                    name: payload.name
                }
            };
        case Actions.START_EXPORT_SCENARIO:
            exportProjectScheme({ ...state.project });
            return state;
        case Actions.START_IMPORT_SCENARIO:
            startImportScenario();
            return state;
        case Actions.SET_RIGHT_COLUMN_TAB:
            return {
                ...state,
                control: {
                    ...state.control,
                    rightColumnActiveTab: action.payload.tab
                }
            }
        default:
            return state;
    }
};
