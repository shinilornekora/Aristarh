import { Actions, ActionType, StateType } from "../../types/store";

export const dndReducer = (state: StateType, action: ActionType): StateType => {
    const { type } = action;

    switch (type) {
        case Actions.START_DND_SCENARIO:
            return {
                ...state,
                control: {
                    ...state.control,
                    targetElementId: action.payload.targetElementId,
                },
            };
        case Actions.END_DND_SCENARIO:
            return {
                ...state,
                control: {
                    ...state.control,
                    targetElementId: '',
                },
            };
        default:
            return state;
    }
};
