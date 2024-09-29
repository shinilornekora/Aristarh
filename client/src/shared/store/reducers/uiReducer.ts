import { Actions, ActionType, StateType } from "../../types";

export const uiReducer = (state: StateType, action: ActionType): StateType => {
    switch(action.type) {
        case Actions.SET_VISIBLE_MENU_POPUP:
            return {
                ...state,
                control: {
                    ...state.control,
                    activePopup: action.payload.popup,
                }
            };
        case Actions.OPEN_LEFT_COLUMN:
            return {
                ...state,
                scenarios: {
                    ...state.scenarios,
                    isLeftColumnVisible: true
                }
            };
        case Actions.START_SUPPORT_POPUP_SCENARIO:
            return {
                ...state,
                scenarios: {
                    ...state.scenarios,
                    supportPopupShow: true,
                }
            };
        case Actions.END_SUPPORT_POPUP_SCENARIO:
            return {
                ...state,
                scenarios: {
                    ...state.scenarios,
                    supportPopupShow: false
                }
            };
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
        default:
            return state;
    }
};
